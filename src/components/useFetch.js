import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function formatName(name) {
      const lCase = name.toLowerCase();
      const dash = lCase.replaceAll(" ", "-");
      return dash;
    }

    function parseData(res) {
      const { results } = res;

      return results.filter((snkr) => {
        let url = snkr.media.imageUrl;
        const { shoe, gender } = snkr;
        return (
          url !== null &&
          !url.includes("Placeholder") &&
          shoe.includes("Jordan 1 Retro High") &&
          gender.includes("men") &&
          !shoe.includes("Flyknit")
        );
      });
    }
    function neededProps(arr) {
      return arr.map((snkr) => {
        return {
          colorway: snkr.colorway,
          linkID: formatName(snkr.name),
          id: snkr.id,
          img: {
            bigImg: snkr.media.imageUrl,
            smallImg: snkr.media.smallImageUrl,
          },
          name: snkr.name,
          releaseDate: snkr.releaseDate,
          retailPrice: snkr.retailPrice,
          shoe: snkr.shoe,
          year: snkr.year,
        };
      });
    }
    const abortCont = new AbortController();

    async function fetchData() {
      try {
        const fetched = await fetch(url, { signal: abortCont.signal });
        const res = await fetched.json();
        const parsed = parseData(res);
        const needed = neededProps(parsed);

        setData(needed);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    }
    fetchData();

    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;

import { userData } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const UseProfile = () => {
  const [datas, setData] = useState<userData>({});
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/profile")
      .then((response) => {
        const data = response.data;
        setData(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return { datas ,loading};
};

export default UseProfile;

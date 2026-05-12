import { ROUTES_PATH } from "@/constant";
import { loadAuthFromStorage } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Redirect } from "expo-router";
import { useEffect } from "react";
const Index = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage())
      .unwrap()
      .then(() => {});
  }, []);

  // if (!isAuthenticated || !user) {
  //   return <Redirect href={ROUTES_PATH.Login} />;
  // }

  return <Redirect href={ROUTES_PATH.Index} />;
};

export default Index;

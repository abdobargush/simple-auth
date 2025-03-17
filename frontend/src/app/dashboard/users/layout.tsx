import { Metadata } from "next";
import Page from "./page";

export const metadata: Metadata = {
  title: "Users",
};

export default function UsersLayout() {
  return <Page />;
}

import { redirect } from "next/navigation";

import { DEFAULT_LOCALE } from "@/i18n/config";

/** Unknown paths outside a locale land on the Korean home page. */
export default function NotFound() {
  redirect(`/${DEFAULT_LOCALE}`);
}

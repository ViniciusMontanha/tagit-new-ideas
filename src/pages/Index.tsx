import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { DeviceComparison } from "@/components/DeviceComparison";
import { HomeFaq } from "@/components/HomeFaq";
import { Solutions } from "@/components/Solutions";
export default function Index() {
  return <><Header /><main id="conteudo"><Hero /><HowItWorks /><Features /><DeviceComparison /><HomeFaq /><Solutions /></main><Footer /></>;
}

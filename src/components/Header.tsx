import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ContactModal } from "@/components/ContactModal";
import logo from "@/assets/logo-225.webp";
import logoRetina from "@/assets/logo-450.webp";
import logoRetina3x from "@/assets/logo-675.webp";
import { Menu, ChevronDown } from "lucide-react";

const solutions = [{ href: "/para-empresas", label: "Para Empresas" }, { href: "/para-voce", label: "Para Você" }, { href: "/segmento", label: "Por segmento" }];
const links = [{ href: "/dispositivos", label: "Dispositivos" }, { href: "/quem-somos", label: "Quem Somos" }, { href: "/area-do-cliente", label: "Área do cliente" }];

export const Header = () => {
  const { pathname } = useLocation();
  const [contact, setContact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [desktopSolutions, setDesktopSolutions] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node)) setDesktopSolutions(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const link = (item: typeof links[0], mobile = false) => (
    <a key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
      onClick={() => { setMenu(false); setDesktopSolutions(false); }}
      className={`${mobile ? "block rounded-lg px-4 py-3" : "inline-flex items-center min-h-11 px-3 py-2 rounded-md"} text-sm font-semibold hover:bg-primary/10 ${pathname === item.href ? "text-primary bg-primary/10" : "text-foreground"}`}>
      {item.label}
    </a>
  );
  return <>
    <a href="#conteudo" className="fixed left-4 top-3 z-[100] -translate-y-24 focus:translate-y-0 rounded-lg bg-foreground px-4 py-3 text-white">Pular para o conteúdo</a>
    <header className="fixed inset-x-0 top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" aria-label="Cabeçalho principal do site">
      <nav className="container mx-auto px-4 flex h-20 sm:h-24 items-center justify-between gap-4" aria-label="Navegação principal">
        <a href="/" aria-label="Tag It - Ir para a página inicial" className="shrink-0">
          <img src={logo} srcSet={`${logo} 225w, ${logoRetina} 450w, ${logoRetina3x} 675w`} sizes="(min-width: 640px) 180px, 135px" alt="Tag It — Localização inteligente" width={225} height={80} className="w-[135px] sm:w-[180px] h-auto" />
        </a>
        <div className="hidden xl:flex items-center gap-2">
          <div ref={dropdown} className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDesktopSolutions(false); }} onKeyDown={event => { if (event.key === "Escape") { setDesktopSolutions(false); trigger.current?.focus(); } }}>
            <button ref={trigger} type="button" className="inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/10" aria-expanded={desktopSolutions} aria-controls="desktop-solutions" onClick={() => setDesktopSolutions(!desktopSolutions)}>Soluções <ChevronDown size={16} aria-hidden="true" /></button>
            <div id="desktop-solutions" hidden={!desktopSolutions} className="absolute left-0 top-full min-w-56 rounded-xl border bg-background p-2 shadow-lg">{solutions.map(item => link(item, true))}</div>
          </div>
          {links.map(item => link(item))}
          <Button onClick={() => setContact(true)} className="ml-2">Solicitar demonstração</Button>
        </div>
        <Sheet open={menu} onOpenChange={open => { setMenu(open); if (!open) setMobileSolutions(false); }}>
          <SheetTrigger asChild><Button variant="outline" size="icon" className="xl:hidden h-11 w-11" aria-label="Abrir menu de navegação"><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="w-[min(90vw,400px)] overflow-y-auto">
            <SheetTitle>Menu de navegação</SheetTitle><SheetDescription>Soluções, dispositivos e atendimento Tag It.</SheetDescription>
            <nav aria-label="Navegação móvel" className="mt-6 space-y-2">
              <button type="button" className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-primary/10 font-semibold" aria-expanded={mobileSolutions} aria-controls="mobile-solutions" onClick={() => setMobileSolutions(!mobileSolutions)}>Soluções <ChevronDown size={18} aria-hidden="true" /></button>
              <div id="mobile-solutions" hidden={!mobileSolutions} className="pl-3">{solutions.map(item => link(item, true))}</div>
              {links.map(item => link(item, true))}
              <a href="mailto:contato@tagit.com.br" className="block px-4 py-3 text-sm text-primary break-all">contato@tagit.com.br</a>
              <Button className="w-full mt-4" onClick={() => { setMenu(false); setContact(true); }}>Solicitar demonstração</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
    <ContactModal isOpen={contact} onOpenChange={setContact} interest="Demonstração" />
  </>;
};

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  FileText,
  Filter,
  Home,
  Users,
  Wallet,
  X,
  Eye,
  TrendingUp,
  Layers,
  Activity,
  Search,
  ChevronDown,
  ExternalLink,
  File,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoOficina from "@/imports/logo_oficina.png";
import logoEmbaixada from "@/imports/Logo_Embaixada.png";
import logoEquidade from "@/imports/Logo_Equidade__tnico_Racial.png";
import logoRedeKalunga from "@/imports/Logo_Rede_Kalunga.png";

// ─── Real data from CSV ───────────────────────────────────────────────────────

// Total oficial: R$ 76.760,00
const monthlyData = [
  { month: "Fevereiro", value: 9200, comprovantes: 7 },
  { month: "Março", value: 18875, comprovantes: 13 },
  { month: "Abril", value: 48685, comprovantes: 24 },
];

// Values grouped by type, summing to R$ 76.760
const categoryData = [
  { name: "Formação e Capacitação", value: 26100, color: "#D98B1F" },
  { name: "Materiais e Alimentação", value: 20325, color: "#B8731A" },
  { name: "Comunicação e Marketing", value: 10700, color: "#8C4E1D" },
  { name: "Produção e Registro", value: 8535, color: "#C9A84C" },
  { name: "Logística e Operações", value: 8100, color: "#A0522D" },
  { name: "Gestão Financeira", value: 3000, color: "#E7D2B0" },
];

// Comprovantes mapping - links do Google Drive
const comprovantesLinks: Record<string, string> = {
  "01": "https://drive.google.com/file/d/1nMT_hZdqpUIO1H0-jfNbFdpq8za3APFS/view?usp=drivesdk",
  "02": "https://drive.google.com/file/d/1ebCNPaxR1O9yeBdVOd75tabNtHeI9LSm/view?usp=drivesdk",
  "03": "https://drive.google.com/file/d/1fBb2fCZI4meK61z-iGpD-5vRKIPGsGz1/view?usp=drivesdk",
  "04": "https://drive.google.com/file/d/1ieWLIWJosWJAn1waA5B2Lny_DEM0h5_N/view?usp=drivesdk",
  "05": "https://drive.google.com/file/d/1jBEzkkDCiZktTguT8KgVmDE_kEhYT_Dn/view?usp=drivesdk",
  "06": "https://drive.google.com/file/d/1GDswXEXo_ztzOF2ti8eI1fEJVVo6oqnt/view?usp=drivesdk",
  "07": "https://drive.google.com/file/d/1VqLa0oxC_A2T71OjE5UNjlChThkQvSKU/view?usp=drivesdk",
  "08": "https://drive.google.com/file/d/1wQWMwppODpQJ-vntHCRO5uZJID7Vc6rB/view?usp=drivesdk",
  "09": "https://drive.google.com/file/d/1mHNMSYt4PJV0ehKGVReWWLPtHALc-vNN/view?usp=drivesdk",
  "10": "https://drive.google.com/file/d/1QggSsVl_7V_H4IGIl7KG0fcWZC5vpVVb/view?usp=drivesdk",
  "11": "https://drive.google.com/file/d/1DVxM3KN3R8E25kUxD0Mz-lyN09pNMqjh/view?usp=drivesdk",
  "12": "https://drive.google.com/file/d/1aZueee-tcwJnOY2n8wHYnld_nkHe5-i4/view?usp=drivesdk",
  "13": "https://drive.google.com/file/d/10hQxz29GGGGjhpQctMse81PPtq6kBzxa/view?usp=drivesdk",
  "14": "https://drive.google.com/file/d/1hINOqgeh5vfoxG52UQTz3YK23KEXbUsB/view?usp=drivesdk",
  "15": "https://drive.google.com/file/d/1aJg64fu0d2TYUwM_O9S6chczwTkohYbH/view?usp=drivesdk",
  "16": "https://drive.google.com/file/d/13MwuYk4BJi_78Rcw6Mv7k4fH5kQRhaOr/view?usp=drivesdk",
  "17": "https://drive.google.com/file/d/1Rgh4LhH6wzMWxAE0sber9i2JiLabozbi/view?usp=drivesdk",
  "18": "https://drive.google.com/file/d/1Ly6wlbJJoy28AV2gDWSjfmtBj5UYKncf/view?usp=drivesdk",
  "19": "https://drive.google.com/file/d/1Vx--qIQO31LPNMCPl0jbrx9AV262obEK/view?usp=drivesdk",
  "20": "https://drive.google.com/file/d/1U1EYgWCvtqSz3V7t4SAevOXYwv-ApL8O/view?usp=drivesdk",
  "21": "https://drive.google.com/file/d/1-0T24-LDL2DLetvR8-_GRflpZZuJc7I0/view?usp=drivesdk",
  "22": "https://drive.google.com/file/d/1NKJgBbhZbIidEOwpoL1v_4rzJzxOGM6o/view?usp=drivesdk",
  "23": "https://drive.google.com/file/d/19FeXUkZeZ8JgzQNuqpViWssseyhx7SPZ/view?usp=drivesdk",
  "24": "https://drive.google.com/file/d/1iibogKYpzFrXi5tm5FFVrMwaZs7kg0im/view?usp=drivesdk",
  "25": "https://drive.google.com/file/d/1pdaS2HCQy6fqDM2AZwiN91ZIf9JgzcuJ/view?usp=drive_link",
  "26": "https://drive.google.com/file/d/1dhUcB3Cn6FPDuJNNocaLyWVdnhyUSrWJ/view?usp=drive_link",
  "27": "https://drive.google.com/file/d/1iUh03iCkSBvC10XuKqyWxbszR4LE0RBu/view?usp=drive_link",
  "28": "https://drive.google.com/file/d/14ukimLMwSEl9GRlsPQlXqzp2gKFTYybo/view?usp=drive_link",
  "29": "https://drive.google.com/file/d/1C3HGkuPMvT8iLCg4TGnrtpqbb2pDFhrz/view?usp=drive_link",
  "30": "https://drive.google.com/file/d/1XnMduqwKxSEq3MCJ2pyrgxiLrG6SFl-1/view?usp=drive_link",
  "31": "https://drive.google.com/file/d/1po2zhZC0DnQ3l5TH1BPiqRtG_8TJs1Am/view?usp=drive_link",
  "32": "https://drive.google.com/file/d/1R9vfrBC5o88k_dRG0WvQu1sblc_aQuXW/view?usp=drive_link",
  "33": "https://drive.google.com/file/d/1kuh8ODcGFZKyPk7KIYKozLKWxigVt-Fz/view?usp=drive_link",
  "34": "https://drive.google.com/file/d/18xfJ5rPmQvJ2DGoefgJi4bexZc5t29dd/view?usp=drive_link",
  "35": "https://drive.google.com/file/d/1-vnEcP1GZyw7Tc3a0xWp24j56oiJ1mdK/view?usp=drive_link",
  "36": "https://drive.google.com/file/d/1O60ytbSMWE2YS12D9e_nCK56OkzUglPV/view?usp=drive_link",
  "37": "https://drive.google.com/file/d/1pDTpBrH4fKyIU4on6mSpvYlTmhaNBjbl/view?usp=drive_link",
  "38": "https://drive.google.com/file/d/1WZM_VPk9wqwfW4l4MWj-fOkbbt7zEm1l/view?usp=drive_link",
  "39": "https://drive.google.com/file/d/1x1AEevYWAEk6ONHNqHT8JfEC2vuPL_t-/view?usp=drivesdk",
  "40": "https://drive.google.com/file/d/1WP5nljXjYNdoFcktTAQxYiI5yBqfQMvc/view?usp=drivesdk",
  "41": "https://drive.google.com/file/d/1X9ZHGME9rUUq421E5gw1u6jE1Br1wx0H/view?usp=drive_link",
  "42": "https://drive.google.com/file/d/1f7Fk460nmX7b7p9n6W_zie4AC1RXudIV/view?usp=drivesdk",
  "43": "https://drive.google.com/file/d/10uS8on0b5E7b02FAfvr5VHjpSWYlbge3/view?usp=drivesdk",
  "44": "https://drive.google.com/file/d/19Y6TsMqZX-5C7s3XKGWfTusbi8Z_ld5E/view?usp=drivesdk",
};

const reportData = [
  { id: 1,  categoria: "Coordenação Geral",             responsavel: "Tales Damascena de Lima",              descricao: "Coordenação geral, pedagógica e acompanhamento das atividades formativas", valor: 7500,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "01, 08, 21" },
  { id: 2,  categoria: "Oficineiro(a) 1",               responsavel: "Tales Damascena de Lima",              descricao: "Oficina de comunicação ancestral e produção de podcast",                  valor: 3000,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "09, 22" },
  { id: 3,  categoria: "Oficineiro(a) 2",               responsavel: "Hígor de Torres Costa",               descricao: "Oficina de comunicação comunitária e narrativas territoriais",            valor: 3000,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "10, 23" },
  { id: 4,  categoria: "Oficineiro(a) 3",               responsavel: "Daniella Teles Maia",                 descricao: "Oficina de comunicação ancestral e estratégias de comunicação",           valor: 3000,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "11, 24" },
  { id: 5,  categoria: "Oficineiro(a) 4",               responsavel: "Isabelle de Almeida Batista",         descricao: "Oficina de fotografia e registro visual comunitário",                    valor: 3000,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "12, 25" },
  { id: 6,  categoria: "Oficineiro(a) 5",               responsavel: "Alciléia Conceição Cesário de Torres",descricao: "Oficina de audiovisual no celular e produção de conteúdo",               valor: 3000,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "13, 26" },
  { id: 7,  categoria: "Palestrante 1",                 responsavel: "Felipe da Costa Souza",               descricao: "Palestra sobre letramento digital e tecnologias",                        valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "27" },
  { id: 8,  categoria: "Palestrante 2",                 responsavel: "Ligia Lie Taakara Ishikawa",          descricao: "Palestra sobre educação ginecológica e saúde física",                    valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "28" },
  { id: 9,  categoria: "Palestrante 3",                 responsavel: "Emanuely de Oliveira",                descricao: "Palestra sobre saúde mental e cuidado coletivo",                        valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "29" },
  { id: 10, categoria: "Monitor Escolar 1",             responsavel: "Lourdes Fernandes de Souza",          descricao: "Apoio pedagógico, mobilização e acompanhamento das oficinas",            valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "30" },
  { id: 11, categoria: "Monitor Escolar 2",             responsavel: "Clarici Fernandes de Souza",          descricao: "Apoio pedagógico, mobilização e acompanhamento das oficinas",            valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "31" },
  { id: 12, categoria: "Monitor Escolar 3",             responsavel: "Quitiane Fernandes de Souza",         descricao: "Apoio pedagógico, mobilização e acompanhamento das oficinas",            valor: 1200,  parcela: "Única",       mes: "Abril",           comprovantes: "32" },
  { id: 13, categoria: "Gestora de Redes Sociais",      responsavel: "Alciléia Conceição Cesário de Torres",descricao: "Cobertura audiovisual e produção de conteúdo para redes sociais",        valor: 3000,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "02, 14, 33" },
  { id: 14, categoria: "Assessora de Imprensa",         responsavel: "Hígor de Torres Costa",               descricao: "Assessoria de imprensa, comunicação institucional e divulgação",         valor: 3000,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "03, 15, 34" },
  { id: 15, categoria: "Marketing Digital",             responsavel: "Daniella Teles Maia",                 descricao: "Marketing digital, planejamento e comunicação do projeto",                valor: 3000,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "04, 16, 35" },
  { id: 16, categoria: "Designer Gráfico",              responsavel: "Felipe da Costa Souza",               descricao: "Criação das artes gráficas e identidade visual do projeto",              valor: 1700,  parcela: "1ª parcela",  mes: "Fevereiro",       comprovantes: "05" },
  { id: 17, categoria: "Fotógrafa",                     responsavel: "Isabelle de Almeida Batista",         descricao: "Cobertura fotográfica das ações, atividades, equipe e participantes",    valor: 2000,  parcela: "Única",       mes: "Abril",           comprovantes: "36" },
  { id: 18, categoria: "Assistente de Produção Cultural",responsavel: "Tainam Malta Souza",                 descricao: "Assistência de produção artística, cenografia, decoração e desfile",    valor: 3200,  parcela: "2 parcelas",  mes: "Mar / Abr",       comprovantes: "17, 37" },
  { id: 19, categoria: "Assistente de Logística",       responsavel: "Cleiberson dos Santos Paulino",       descricao: "Operação logística, apoio estrutural e acompanhamento das atividades",   valor: 3000,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "06, 18, 38" },
  { id: 20, categoria: "Materiais Pedagógicos",         responsavel: "Tales Damascena de Lima",              descricao: "Passagens, cadernetas, materiais de papelaria, kits dos participantes", valor: 8600,  parcela: "Única",       mes: "Abril",           comprovantes: "39" },
  { id: 21, categoria: "Alimentação e Logística",       responsavel: "Tales Damascena de Lima",              descricao: "Alimentação, supermercado, transporte e apoio logístico operacional",   valor: 8125,  parcela: "Única",       mes: "Abril",           comprovantes: "40" },
  { id: 22, categoria: "Hospedagem Comunitária",        responsavel: "Quita de Souza Ribeiro",               descricao: "Hospedagem comunitária dos oficineiros e palestrantes",                 valor: 1500,  parcela: "Única",       mes: "Abril",           comprovantes: "41" },
  { id: 23, categoria: "Alimentação Coletiva",          responsavel: "Quita de Souza Ribeiro",               descricao: "Alimentação coletiva distribuída entre 3 cozinheiras da comunidade",   valor: 3600,  parcela: "Única",       mes: "Abril",           comprovantes: "42" },
  { id: 24, categoria: "Camisetas 3ª Edição",           responsavel: "Izael Ferreira de Freitas",            descricao: "Produção gráfica e confecção das camisetas do projeto",                 valor: 2275,  parcela: "1ª parcela",  mes: "Março",           comprovantes: "19" },
  { id: 25, categoria: "Gráfica, Banners e Comunicação Visual",responsavel: "Tainam Malta Souza / Paulo Guedes",descricao: "Produção de banner e estrutura de comunicação visual",             valor: 1060,  parcela: "Única",       mes: "Abril",           comprovantes: "43" },
  { id: 26, categoria: "Prestação de Contas",           responsavel: "Nãnan da Silva Souza Matos",           descricao: "Organização financeira, relatório e prestação de contas do projeto",   valor: 3000,  parcela: "3 parcelas",  mes: "Fev / Mar / Abr", comprovantes: "07, 20, 44" },
];

type Page = "dashboard" | "relatorio";

// Helper: Convert Google Drive view link to preview/embed link
function getGDrivePreviewUrl(url: string): string {
  const match = url.match(/\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [selectedMonth, setSelectedMonth] = useState<string>("todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<(typeof reportData)[0] | null>(null);
  const [selectedComprovante, setSelectedComprovante] = useState<{ numero: string; link: string } | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const filteredReport = reportData.filter((item) => {
    const monthOk =
      selectedMonth === "todos" ||
      item.mes.toLowerCase().includes(selectedMonth.toLowerCase());
    const catOk =
      selectedCategory === "todas" ||
      item.categoria.toLowerCase().includes(selectedCategory.toLowerCase());
    return monthOk && catOk;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0B0B0B]/85 border-b border-[#D98B1F]/20">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <ImageWithFallback src={logoOficina} alt="KALUNGA Oficina de Comunicação" className="h-8 w-auto object-contain" />
              <span className="text-[#E7D2B0]/60 text-sm font-light hidden md:block">Oficina de Comunicação</span>
            </motion.div>

            <div className="flex gap-1">
              {(["dashboard", "relatorio"] as Page[]).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    currentPage === page
                      ? "bg-[#D98B1F] text-[#0B0B0B] shadow-lg shadow-[#D98B1F]/25"
                      : "text-[#E7D2B0] hover:bg-[#D98B1F]/10"
                  }`}
                >
                  {page === "dashboard" ? <Home className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  {page === "dashboard" ? "Dashboard" : "Relatório Geral"}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 rounded-lg bg-[#D98B1F]/10 text-[#D98B1F] hover:bg-[#D98B1F]/20 transition-all flex items-center gap-2 text-sm"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:block">Filtros</span>
          </button>
        </div>
      </nav>

      {/* ── Filter Sidebar ── */}
      <motion.div
        initial={false}
        animate={{ x: showFilters ? 0 : 360 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed right-0 top-0 bottom-0 w-72 bg-[#111]/95 backdrop-blur-2xl border-l border-[#D98B1F]/20 z-50 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-[#D98B1F]">Filtros</h3>
          <button onClick={() => setShowFilters(false)} className="p-1.5 hover:bg-[#D98B1F]/10 rounded-lg transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <FilterGroup label="Mês" options={["todos", "Fevereiro", "Março", "Abril"]} value={selectedMonth} onChange={setSelectedMonth} />
        <FilterGroup
          label="Categoria"
          options={["todas", "Coordenação", "Oficineiro", "Palestrante", "Monitor", "Comunicação", "Marketing", "Produção", "Logística", "Materiais", "Alimentação", "Gestão"]}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </motion.div>

      {/* ── Main ── */}
      <main className="pt-20 pb-16 px-4 md:px-6">
        {currentPage === "dashboard" ? (
          <DashboardPage />
        ) : (
          <RelatorioPage data={filteredReport} onViewEntry={setSelectedEntry} />
        )}
      </main>

      {/* ── Entry Detail Modal ── */}
      <Dialog.Root open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-[#141414] rounded-2xl border border-[#D98B1F]/25 shadow-2xl shadow-[#D98B1F]/10 z-50 overflow-hidden">
            <div className="p-5 border-b border-[#D98B1F]/20 flex items-center justify-between">
              <Dialog.Title className="font-bold text-[#D98B1F]">{selectedEntry?.categoria}</Dialog.Title>
              <Dialog.Close className="p-1.5 hover:bg-[#D98B1F]/10 rounded-lg transition-all">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>
            {selectedEntry && (
              <div className="p-6 space-y-4">
                <Row label="Responsável" value={selectedEntry.responsavel} />
                <Row label="Descrição" value={selectedEntry.descricao} />
                <Row label="Período" value={selectedEntry.mes} />
                <Row label="Parcela" value={selectedEntry.parcela} />

                {/* Comprovantes com botões premium */}
                <div>
                  <p className="text-xs text-[#8C4E1D] mb-2">Comprovantes</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.comprovantes.split(",").map((comp) => {
                      const numero = comp.trim();
                      const link = comprovantesLinks[numero];
                      return link ? (
                        <button
                          key={`comp-${numero}`}
                          onClick={() => setSelectedComprovante({ numero, link })}
                          className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-[#D98B1F]/10 border border-[#D98B1F]/30 text-[#D98B1F] hover:bg-[#D98B1F] hover:text-[#0B0B0B] transition-all text-sm font-medium"
                        >
                          <File className="w-4 h-4" />
                          <span>Comp. {numero}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                        </button>
                      ) : (
                        <span key={`comp-${numero}`} className="px-3 py-2 rounded-lg bg-[#8C4E1D]/10 text-[#8C4E1D] text-sm">
                          Comp. {numero}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D98B1F]/20">
                  <p className="text-xs text-[#8C4E1D] mb-1">Valor Total</p>
                  <p className="text-3xl font-bold text-[#D98B1F]">
                    R${" "}{selectedEntry.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── Comprovante Preview Modal ── */}
      <Dialog.Root open={!!selectedComprovante} onOpenChange={() => setSelectedComprovante(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-5xl bg-[#0B0B0B] rounded-2xl border border-[#D98B1F]/30 shadow-2xl shadow-[#D98B1F]/20 z-[60] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#D98B1F]/20 flex items-center justify-between bg-[#141414]/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-[#D98B1F]" />
                <Dialog.Title className="font-bold text-[#D98B1F]">
                  Comprovante {selectedComprovante?.numero}
                </Dialog.Title>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedComprovante?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#D98B1F]/10 text-[#D98B1F] hover:bg-[#D98B1F] hover:text-[#0B0B0B] transition-all text-sm font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir no Drive
                </a>
                <Dialog.Close className="p-1.5 hover:bg-[#D98B1F]/10 rounded-lg transition-all">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
            </div>
            <div className="flex-1 bg-[#0B0B0B] p-4 overflow-hidden">
              {selectedComprovante && (
                <iframe
                  src={getGDrivePreviewUrl(selectedComprovante.link)}
                  className="w-full h-full rounded-xl border border-[#D98B1F]/20"
                  title={`Comprovante ${selectedComprovante.numero}`}
                  allow="autoplay"
                />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

// ─── Helper sub-components ────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#8C4E1D] mb-0.5">{label}</p>
      <p className="text-[#F5F5F5] text-sm">{value}</p>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-[#E7D2B0]/60 uppercase tracking-widest mb-3">{label}</p>
      <div className="space-y-1">
        {options.map((opt, idx) => (
          <button
            key={`filter-${label}-${opt}-${idx}`}
            onClick={() => onChange(opt)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              value === opt
                ? "bg-[#D98B1F] text-[#0B0B0B] font-medium"
                : "text-[#E7D2B0] hover:bg-[#D98B1F]/10"
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[#D98B1F]/20 p-8 md:p-14"
        style={{ background: "linear-gradient(135deg, #0B0B0B 0%, #141414 50%, #0B0B0B 100%)" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D98B1F] opacity-[0.06] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8C4E1D] opacity-[0.08] blur-[80px] pointer-events-none" />

        {/* African geometric pattern */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 0L30 30L0 60M60 0L30 30L60 60M30 0L0 30L30 60L60 30Z" stroke="#D98B1F" strokeWidth="0.8" fill="none" />
                <rect x="22" y="22" width="16" height="16" stroke="#D98B1F" strokeWidth="0.6" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo)" />
          </svg>
        </div>

        <div className="relative z-10 text-center space-y-6">
          {/* Main logo */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }}>
            <div className="relative inline-block">
              <ImageWithFallback src={logoOficina} alt="KALUNGA" className="h-20 md:h-28 w-auto object-contain mx-auto" />
              <div className="absolute inset-0 blur-3xl bg-[#D98B1F] opacity-20 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-1">
            <h2 className="text-xl md:text-2xl font-medium text-[#E7D2B0]">Dashboard Interativo de Prestação de Contas</h2>
            <p className="text-sm text-[#8C4E1D]">Oficina de Comunicação Kalunga · Fevereiro – Abril 2024</p>
          </motion.div>

          {/* KPI */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 }} className="inline-block">
            <div className="bg-[#D98B1F]/10 backdrop-blur-xl border border-[#D98B1F]/30 rounded-2xl px-10 py-6 shadow-2xl shadow-[#D98B1F]/10">
              <p className="text-xs font-semibold text-[#E7D2B0]/60 uppercase tracking-widest mb-1">Valor Total Executado</p>
              <p className="text-5xl md:text-6xl font-bold text-[#D98B1F] tracking-tight">R$ 76.760,00</p>
            </div>
          </motion.div>

          {/* Partner logos */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <PartnerLogo src={logoEmbaixada} alt="Embaixada da Irlanda no Brasil" />
            <PartnerLogo src={logoEquidade} alt="Edital Equidade Étnico-Racial" />
            <PartnerLogo src={logoRedeKalunga} alt="Rede Kalunga Comunicações" />
          </motion.div>
        </div>
      </motion.section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={<Wallet className="w-5 h-5" />}  label="Embaixada da Irlanda"           value="R$ 53.181,07" delay={0}   />
        <KpiCard icon={<TrendingUp className="w-5 h-5" />} label="Edital Equidade Étnico-racial" value="R$ 23.578,93" delay={0.08} />
        <KpiCard icon={<FileText className="w-5 h-5" />} label="Comprovantes"                  value="44"           delay={0.16} />
        <KpiCard icon={<Users className="w-5 h-5" />}   label="Oficinas Realizadas"            value="5"            delay={0.24} />
      </section>

      {/* Charts row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Donut — category breakdown */}
        <ChartCard title="Distribuição dos Recursos" delay={0.3}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart id="pie-chart-category">
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={`pie-cell-${entry.name}-${i}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(217,139,31,0.25)", borderRadius: "10px", color: "#F5F5F5", fontSize: "13px" }}
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((cat, i) => (
              <div key={`legend-${cat.name}-${i}`} className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-[#E7D2B0] truncate">{cat.name}</span>
                <span className="text-xs text-[#8C4E1D] ml-auto shrink-0">
                  {Math.round((cat.value / 76760) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Bar — monthly execution */}
        <ChartCard title="Execução Mensal" delay={0.38}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart id="bar-chart-monthly" data={monthlyData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D98B1F14" vertical={false} />
              <XAxis dataKey="month" stroke="#E7D2B060" tick={{ fontSize: 12, fill: "#E7D2B0" }} axisLine={false} tickLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 11, fill: "#8C4E1D" }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(217,139,31,0.25)", borderRadius: "10px", color: "#F5F5F5", fontSize: "13px" }}
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Executado"]}
                cursor={{ fill: "rgba(217,139,31,0.06)" }}
              />
              <Bar dataKey="value" fill="#D98B1F" radius={[6, 6, 0, 0]} maxBarSize={72} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4 justify-center">
            {monthlyData.map((m, idx) => (
              <div key={`monthly-summary-${m.month}-${idx}`} className="text-center">
                <p className="text-xs text-[#8C4E1D]">{m.month.slice(0, 3)}</p>
                <p className="text-sm font-semibold text-[#D98B1F]">{m.comprovantes} comp.</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </section>

      {/* Horizontal bar — category detail */}
      <section>
        <ChartCard title="Detalhamento por Categoria" delay={0.46}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart id="bar-chart-horizontal" data={categoryData} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D98B1F14" horizontal={false} />
              <XAxis type="number" stroke="transparent" tick={{ fontSize: 11, fill: "#8C4E1D" }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 11, fill: "#E7D2B0" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(217,139,31,0.25)", borderRadius: "10px", color: "#F5F5F5", fontSize: "13px" }}
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
                cursor={{ fill: "rgba(217,139,31,0.06)" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={32}>
                {categoryData.map((entry, i) => (
                  <Cell key={`hbar-cell-${entry.name}-${i}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard icon={<Activity className="w-8 h-8" />} label="Palestras" value="3" delay={0.52} />
        <StatCard icon={<Calendar className="w-8 h-8" />} label="Meses de Execução" value="3" delay={0.58} />
        <StatCard icon={<Layers className="w-8 h-8" />} label="Categorias Ativas" value="6" delay={0.64} />
      </section>
    </div>
  );
}

// ─── Relatório Page ───────────────────────────────────────────────────────────

function RelatorioPage({
  data,
  onViewEntry,
}: {
  data: typeof reportData;
  onViewEntry: (entry: (typeof reportData)[0]) => void;
}) {
  const [search, setSearch] = useState("");
  const [previewComprovante, setPreviewComprovante] = useState<{ numero: string; link: string } | null>(null);

  const filtered = data.filter(
    (item) =>
      item.categoria.toLowerCase().includes(search.toLowerCase()) ||
      item.responsavel.toLowerCase().includes(search.toLowerCase()) ||
      item.mes.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.reduce((acc, item) => acc + item.valor, 0);

  return (
    <div className="max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#D98B1F] mb-1">Relatório Geral</h1>
          <p className="text-sm text-[#8C4E1D]">Prestação de contas detalhada · {filtered.length} registros</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C4E1D]" />
          <input
            type="text"
            placeholder="Buscar por categoria, responsável..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 pl-9 pr-4 py-2 bg-[#141414]/70 border border-[#D98B1F]/20 rounded-xl text-sm text-[#F5F5F5] placeholder-[#8C4E1D] focus:outline-none focus:border-[#D98B1F]/50 transition-all"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#141414]/50 backdrop-blur-xl rounded-2xl border border-[#D98B1F]/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D98B1F]/15">
                {["#", "Categoria", "Responsável", "Período", "Parcela", "Valor", "Comprovantes", ""].map((h, i) => (
                  <th key={`th-header-${h || 'actions'}-${i}`} className="text-left px-4 py-3 text-xs font-semibold text-[#8C4E1D] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="border-b border-[#D98B1F]/08 hover:bg-[#D98B1F]/04 transition-colors group"
                >
                  <td className="px-4 py-3 text-xs text-[#8C4E1D] w-10">{item.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D98B1F] shrink-0" />
                      <span className="text-sm text-[#F5F5F5] font-medium leading-tight">{item.categoria}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#E7D2B0] max-w-[180px]">
                    <span className="truncate block">{item.responsavel}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#E7D2B0] whitespace-nowrap">{item.mes}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#D98B1F]/12 text-[#D98B1F]">{item.parcela}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#D98B1F] whitespace-nowrap">
                    R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2 max-w-[360px]">
                      {item.comprovantes
                        .split(",")
                        .map((comp) => comp.trim())
                        .filter(Boolean)
                        .map((numero) => {
                          const link = comprovantesLinks[numero];

                          return link ? (
                            <button
                              key={`comp-btn-${item.id}-${numero}`}
                              onClick={() => setPreviewComprovante({ numero, link })}
                              className="
                                group
                                px-3 py-1.5
                                rounded-lg
                                bg-[#D98B1F]/10
                                border border-[#D98B1F]/25
                                text-[#D98B1F]
                                hover:bg-[#D98B1F]
                                hover:text-[#0B0B0B]
                                transition-all
                                text-xs
                                font-medium
                                flex
                                items-center
                                gap-1.5
                                shadow-sm
                                hover:shadow-lg
                                hover:shadow-[#D98B1F]/20
                              "
                            >
                              <File className="w-3.5 h-3.5" />

                              <span>
                                Comp. {numero}
                              </span>

                              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                            </button>
                          ) : null;
                        })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewEntry(item)}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D98B1F]/10 text-[#D98B1F] hover:bg-[#D98B1F] hover:text-[#0B0B0B] transition-all text-xs font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Detalhes
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-[#D98B1F]/04 border-t border-[#D98B1F]/15 flex items-center justify-between">
          <span className="text-sm text-[#E7D2B0]">
            <span className="font-semibold text-[#F5F5F5]">{filtered.length}</span> registros · {filtered.length} comprovantes
          </span>
          <div className="text-right">
            <p className="text-xs text-[#8C4E1D] mb-0.5">Total filtrado</p>
            <p className="text-2xl font-bold text-[#D98B1F]">
              R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal de Preview de Comprovante */}
      <Dialog.Root open={!!previewComprovante} onOpenChange={() => setPreviewComprovante(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-5xl bg-[#0B0B0B] rounded-2xl border border-[#D98B1F]/30 shadow-2xl shadow-[#D98B1F]/20 z-[60] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-[#D98B1F]/20 flex items-center justify-between bg-[#141414]/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-[#D98B1F]" />
                <Dialog.Title className="font-bold text-[#D98B1F]">
                  Comprovante {previewComprovante?.numero}
                </Dialog.Title>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewComprovante?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#D98B1F]/10 text-[#D98B1F] hover:bg-[#D98B1F] hover:text-[#0B0B0B] transition-all text-sm font-medium flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir no Drive
                </a>
                <Dialog.Close className="p-1.5 hover:bg-[#D98B1F]/10 rounded-lg transition-all">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
            </div>
            <div className="flex-1 bg-[#0B0B0B] p-4 overflow-hidden">
              {previewComprovante && (
                <iframe
                  src={getGDrivePreviewUrl(previewComprovante.link)}
                  className="w-full h-full rounded-xl border border-[#D98B1F]/20"
                  title={`Comprovante ${previewComprovante.numero}`}
                  allow="autoplay"
                />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

// ─── Reusable components ──────────────────────────────────────────────────────

function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white/95 rounded-xl px-4 py-2.5 flex items-center justify-center" style={{ minWidth: 120, maxWidth: 160 }}>
      <ImageWithFallback src={src} alt={alt} className="h-10 w-auto object-contain" />
    </div>
  );
}

function KpiCard({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="group relative bg-[#141414]/60 backdrop-blur-xl rounded-2xl border border-[#D98B1F]/20 p-5 overflow-hidden transition-all hover:border-[#D98B1F]/40 hover:shadow-xl hover:shadow-[#D98B1F]/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D98B1F]/0 to-[#D98B1F]/08 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="p-2 rounded-lg bg-[#D98B1F]/10 text-[#D98B1F] w-fit mb-4 group-hover:bg-[#D98B1F] group-hover:text-[#0B0B0B] transition-all">
          {icon}
        </div>
        <p className="text-xs text-[#8C4E1D] mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#F5F5F5]">{value}</p>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#141414]/50 backdrop-blur-xl rounded-2xl border border-[#D98B1F]/20 p-6"
    >
      <h3 className="text-base font-bold text-[#D98B1F] mb-5">{title}</h3>
      {children}
    </motion.div>
  );
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-[#D98B1F]/10 to-[#8C4E1D]/08 rounded-2xl border border-[#D98B1F]/20 p-8 text-center"
    >
      <div className="inline-flex p-4 rounded-2xl bg-[#D98B1F]/10 text-[#D98B1F] mb-4">{icon}</div>
      <p className="text-4xl font-bold text-[#F5F5F5] mb-1">{value}</p>
      <p className="text-sm text-[#E7D2B0]">{label}</p>
    </motion.div>
  );
}

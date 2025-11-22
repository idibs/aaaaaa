SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `tcc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  USE `tcc`;

  -- ---------- (opcional p/ teste limpo) ----------
  DROP TABLE IF EXISTS `pedido_produto`;
  DROP TABLE IF EXISTS `pedido`;
  DROP TABLE IF EXISTS `carga`;
  DROP TABLE IF EXISTS `pagamento`;
  DROP TABLE IF EXISTS `funcionario`;
  DROP TABLE IF EXISTS `usuario_sistema`;
  DROP TABLE IF EXISTS `produto_ensacado`;
  DROP TABLE IF EXISTS `produto_base`;
  DROP TABLE IF EXISTS `outros_produtos`;
  DROP TABLE IF EXISTS `pessoa`;
  DROP TABLE IF EXISTS `endereco`;
  DROP TABLE IF EXISTS `categoria`;
  DROP TABLE IF EXISTS `cargo`;
  DROP TABLE IF EXISTS `caminhao`;
  DROP TABLE IF EXISTS `email_verification`;
    DROP TABLE IF EXISTS `produto`;
  SET FOREIGN_KEY_CHECKS = 1;

--
-- Estrutura para tabela `caminhao`
--

CREATE TABLE `caminhao` (
  `Id_cam` int(11) NOT NULL,
  `código_cam` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `caminhao`
--

INSERT INTO `caminhao` (`Id_cam`, `código_cam`) VALUES
(1, 'CAM001'),
(2, 'CAM002'),
(3, 'CAM003');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargo`
--

CREATE TABLE `cargo` (
  `Id_car` int(11) NOT NULL,
  `Nome_car` varchar(100) NOT NULL,
  `Salario_dia_car` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cargo`
--

INSERT INTO `cargo` (`Id_car`, `Nome_car`, `Salario_dia_car`) VALUES
(1, 'Encarregado de Produção', 6.00),
(2, 'Motorista', 7.00),
(3, 'Movimentador de Carga', 5.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `Id_categ` int(11) NOT NULL,
  `Nome_categ` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`Id_categ`, `Nome_categ`) VALUES
(1, 'Ração'),
(2, 'Variedade');

-- --------------------------------------------------------

--
-- Estrutura para tabela `email_verification`
--

CREATE TABLE `email_verification` (
  `id_ema` int(11) NOT NULL,
  `email_ema` varchar(255) NOT NULL,
  `code_hash_ema` varchar(128) NOT NULL,
  `expires_at_ema` datetime NOT NULL,
  `created_at_ema` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `Id_end` int(11) NOT NULL,
  `Cidade_end` varchar(60) NOT NULL,
  `Rua_end` varchar(60) NOT NULL,
  `Numero_end` varchar(4) NOT NULL,
  `Bairro_end` varchar(20) NOT NULL,
  `Cep_end` char(8) NOT NULL,
  `Complemento_end` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`Id_end`, `Cidade_end`, `Rua_end`, `Numero_end`, `Bairro_end`, `Cep_end`, `Complemento_end`) VALUES
(1, 'Pilar do Sul', 'Rua B', '202', 'Vila Nova', '23456789', 'Casa 2'),
(2, 'Pilar do Sul', 'Rua D', '404', 'Alvorada', '45678901', 'Bloco B'),
(3, 'Pilar do Sul', 'Rua F', '606', 'Boa Vista', '67890123', 'Apto 606'),
(4, 'Pilar do Sul', 'Rua H', '808', 'Águas Claras', '89012345', 'Loja 808'),
(5, 'Pilar do Sul', 'Rua J', '100', 'Centro Histórico', '01234567', 'Apto 100'),
(6, 'Pilar do Sul', 'Rua Pedro Heleodoro Pinto', '195', 'Santa Cecília', '18186018', 'casa'),
(7, 'Sorocaba', 'Rua A', '101', 'Centro', '12345678', 'Apto 101'),
(8, 'Sorocaba', 'Rua C', '303', 'Jardim', '34567890', 'Apto 303'),
(9, 'Sorocaba', 'Rua E', '505', 'São Luiz', '56789012', 'Casa 5'),
(10, 'Sorocaba', 'Rua G', '707', 'Olaria', '78901234', 'Sala Comercial'),
(11, 'Sorocaba', 'Rua I', '909', 'Vila Real', '90123456', 'Casa 9');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `Id_func` int(11) NOT NULL,
  `Nome_func` varchar(255) NOT NULL,
  `Telefone_func` varchar(13) NOT NULL,
  `cpf_func` varchar(11) NOT NULL,
  `Tipo_func` varchar(20) NOT NULL,
  `Id_car` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionario`
--

INSERT INTO `funcionario` (`Id_func`, `Nome_func`, `Telefone_func`, `cpf_func`, `Tipo_func`, `Id_car`) VALUES
(1, 'Juliana Costa', '11777766655', '34567890123', 'Não Registrado', 2),
(2, 'Lucas Pereira', '11888877766', '23456789012', 'Registrado', 3),
(3, 'Marcos Silva', '11999988877', '12345678901', 'Registrado', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `outros_produtos`
--

CREATE TABLE `outros_produtos` (
  `Id_out` int(11) NOT NULL,
  `Nome_out` varchar(255) NOT NULL,
  `Preco_med_out` decimal(10,2) NOT NULL,
  `Quantidade_out` int(11) NOT NULL,
  `Peso_out` int(11) DEFAULT NULL,
  `Codigo_out` varchar(50) NOT NULL,
  `Foto_out` varchar(50) DEFAULT NULL,
  `Descricao_out` varchar(500) DEFAULT NULL,
  `Id_categ` int(11) NOT NULL,
  `Id_prod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `outros_produtos`
--

INSERT INTO `outros_produtos` (`Id_out`, `Nome_out`, `Preco_med_out`, `Quantidade_out`, `Peso_out`, `Codigo_out`, `Foto_out`, `Descricao_out`, `Id_categ`, `Id_prod`) VALUES
(1, 'Adubo 04x14x08 25kg', 0.00, 0, 25, 'OUT001', 'adubo4x14x08.png', 'Fertilizante químico de fórmula NPK 4-14-8. Indicado para promover o desenvolvimento das raízes e estimular a floração de culturas agrícolas. Deve ser aplicado no solo ou em covas segundo orientação técnica. Composto por nitrogênio (4%), fósforo (14%) e potássio (8%), oferecendo equilíbrio para muitas plantações.', 2, NULL),
(2, 'Adubo 10x10x10 25kg', 0.00, 0, 25, 'OUT002', 'adubo10x10x10.jpg', 'Fertilizante balanceado (NPK 10-10-10), com proporções iguais de nitrogênio, fósforo e potássio. Ideal para uso geral em diversas culturas, fornecendo nutrição equilibrada para crescimento, floração e frutificação. Aplicar no solo conforme recomendação agronômica. Composição: 10% N, 10% P₂O₅, 10% K₂O.', 2, NULL),
(3, 'Adubo 20x05x20 25kg', 0.00, 0, 25, 'OUT003', 'adubo20x05x20.jpg', 'Fertilizante enriquecido para dar mais impulso energético e nitrogenado à planta. Indicado para fases de crescimento vigoroso. Uso no solo na aplicação recomendada para não haver excesso. Composição: 20% nitrogênio, 5% fósforo, 20% potássio.', 2, NULL),
(4, 'Alto Grão 32% 40kg', 0.00, 0, 40, 'OUT004', 'altograo.jpg', 'Ração peletizada de alto teor proteico (32%) para bovinos, formulada para ganho de peso eficiente. Seria usada como suplemento proteico nas dietas de engorda ou recria. Mistura recomendada de acordo com a necessidade nutricional ou fornecimento direto. Composição: grãos, farelos, vitaminas, minerais e fonte de proteína para garantir 32% de PB (proteína bruta).', 2, NULL),
(5, 'Areia p/ Gato Puracat 20kg', 0.00, 0, 20, 'OUT005', 'areiagato.png', 'Produto mineral absorvente para higiene felina. Utilizada para manter a caixa de areia limpa, absorver odores e facilitar a remoção de resíduos. Basta colocar uma camada na bandeja sanitária e trocar conforme a frequência de uso. Composição: argila ou sílica (material granulado absorvente).', 2, NULL),
(6, 'Carvão Saco Ráfia', 0.00, 0, 0, 'OUT006', 'carvao.jpg', 'Carvão vegetal de origem florestal, embalado em saco de ráfia reforçado. Usado para churrasco, fogões a lenha ou aquecimento. Acender com gravetos ou acendedor, manter ventilado até acender bem. Composição: madeira carbonizada com alto poder calorífico.', 2, NULL),
(7, 'Cat Brazil Carne 30% 25kg', 0.00, 0, 25, 'OUT007', 'catbrazil.png', 'Ração completa para gatos, com 30% de proteína, voltada para manutenção de massa magra e boa saúde felina. Pode ser servida seca diariamente. Composição: carnes (ou farinha de carne), cereais, vitaminas, minerais e aminoácidos essenciais para felinos.', 1, NULL),
(8, 'Dog Brazil 20% 07kg', 0.00, 0, 7, 'OUT008', 'dogbrazil20.png', 'Ração para cães adultos de manutenção com 20% de proteína. Oferece nutrição básica e balanceada para cães que não exigem dietas de desempenho. Modo de uso: servir conforme peso do animal, seguindo tabela nutricional apropriada. Composição: cereais, fontes protéicas, gorduras, vitaminas e minerais.', 1, NULL),
(9, 'Dog Brazil 20% 20kg', 0.00, 0, 20, 'OUT009', 'dogbrazil20.png', 'Ração para cães adultos de manutenção com 20% de proteína. Oferece nutrição básica e balanceada para cães que não exigem dietas de desempenho. Modo de uso: servir conforme peso do animal, seguindo tabela nutricional apropriada. Composição: cereais, fontes protéicas, gorduras, vitaminas e minerais.', 1, NULL),
(10, 'Dog Brazil 20% 25kg', 0.00, 0, 25, 'OUT010', 'dogbrazil20.png', 'Ração para cães adultos de manutenção com 20% de proteína. Oferece nutrição básica e balanceada para cães que não exigem dietas de desempenho. Modo de uso: servir conforme peso do animal, seguindo tabela nutricional apropriada. Composição: cereais, fontes protéicas, gorduras, vitaminas e minerais.', 1, NULL),
(11, 'Dog Brazil 23% Premium 15kg', 0.00, 0, 15, 'OUT011', 'dogbrazil23.png', 'Ração premium para cães adultos, com 23% de proteína e ingredientes de alta qualidade, visando suporte muscular, saúde de pelagem e digestão. Fornecer seco conforme a necessidade calórica do animal. Composição: proteína de origem animal, cereais seleccionados, gorduras saudáveis, vitaminas e minerais.', 1, NULL),
(12, 'Dog Brazil 23% Premium 25kg', 0.00, 0, 25, 'OUT012', 'dogbrazil23.png', 'Ração premium para cães adultos, com 23% de proteína e ingredientes de alta qualidade, visando suporte muscular, saúde de pelagem e digestão. Fornecer seco conforme a necessidade calórica do animal. Composição: proteína de origem animal, cereais seleccionados, gorduras saudáveis, vitaminas e minerais.', 1, NULL),
(13, 'Dog Brazil Filhote 28% 25kg', 0.00, 0, 25, 'OUT013', 'dogbrazilfilhote.png', 'Ração formulada para filhotes de cães com alto teor de proteína (28%) para apoiar crescimento, saúde óssea e função imune. Deve ser fornecida conforme curva de crescimento (idade/peso) do filhote. Composição: proteína de origem animal, DHA, cálcio, vitaminas A, D, E para suporte ao desenvolvimento.', 1, NULL),
(14, 'Equestre Campo 40kg', 0.00, 0, 40, 'OUT014', 'equestre.png', 'Ração para equinos, formulada para fornecer energia, fibras e nutrientes suficientes para cavalos em trabalho leve a moderado. Modo de uso: oferecer dividido em duas a três refeições diárias, dependendo do regime de trabalho. Composição: grãos como milho, farelos, fibras, vitaminas e minerais para equinos.', 1, NULL),
(15, 'Formilix 500ml', 0.00, 0, NULL, 'OUT015', 'formilix.jpg', 'Produto inseticida em formato líquido, especialmente indicado para controle de formigas. Administra-se aplicando diretamente nos ninhos ou trilhas de formigas. Composição: princípio ativo formicida + solventes seguros utilizados na formulação comercial.', 2, NULL),
(16, 'Funny Bunny 500g x12 (6kg)', 0.00, 0, 6, 'OUT016', 'funnybunny.png', 'Ração de alta qualidade para coelhos, ideal para crescimento, manutenção ou produção. Oferecer diariamente, ajustando a quantidade conforme idade e peso. Composição: feno, farelos de cereal, vitamina A, fibras e minerais adequados para coelhos.', 2, NULL),
(17, 'Isca Mix Formiga Pika-Pau 10x50g', 0.00, 0, NULL, 'OUT017', 'iscamix.jpg', 'Iscas prontas para controle de formigas, contendo atrativos e veneno específico. Colocar em locais estratégicos onde as formigas transitam. Composição: atrativo alimentar + princípio ativo inseticida.', 2, NULL),
(18, 'Ivermectina 1mg', 0.00, 0, 1, 'OUT018', 'ivermectina1mg.png', 'Medicamento antiparasitário para uso veterinário, indicado para controle de parasitas internos (vermes) e externos (carrapatos) em animais. Uso: aplicar conforme prescrição de um veterinário, seguindo dosagem por peso corporal. Composição: ivermectina como princípio ativo.', 2, NULL),
(19, 'Ivermectina 12mg', 0.00, 0, 12, 'OUT019', 'ivermectina12mg.png', 'Medicamento antiparasitário para uso veterinário, indicado para controle de parasitas internos (vermes) e externos (carrapatos) em animais. Uso: aplicar conforme prescrição de um veterinário, seguindo dosagem por peso corporal. Composição: ivermectina como princípio ativo.', 2, NULL),
(20, 'Ivermectina 3mg', 0.00, 0, 3, 'OUT020', 'ivermectina3mg.png', 'Medicamento antiparasitário para uso veterinário, indicado para controle de parasitas internos (vermes) e externos (carrapatos) em animais. Uso: aplicar conforme prescrição de um veterinário, seguindo dosagem por peso corporal. Composição: ivermectina como princípio ativo.', 2, NULL),
(21, 'Ivermectina 6mg', 0.00, 0, 6, 'OUT021', 'ivermectina6mg.png', 'Medicamento antiparasitário para uso veterinário, indicado para controle de parasitas internos (vermes) e externos (carrapatos) em animais. Uso: aplicar conforme prescrição de um veterinário, seguindo dosagem por peso corporal. Composição: ivermectina como princípio ativo.', 2, NULL),
(22, 'Núcleo Bovino Leite 3RL 30kg ADM', 0.00, 0, 30, 'OUT022', 'nucleobovino.png', 'Núcleo mineral-vitaminado para bovinos de leite, usado para formular ração balanceada em rebanhos leiteiros. Modo de uso: misturar conforme indicação de nutricionista (ex: 3% ou conforme TMR). Composição: minerais (cálcio, fósforo), vitaminas, tamponantes e outros aditivos típicos de núcleos para leite.', 1, NULL),
(23, 'Núcleo Engorda 5% 25kg ADM', 0.00, 0, 25, 'OUT023', 'nucleofrangoengordaadm.png', 'Núcleo mineral-proteico para frangos de corte engorda. Segundo a ADM, usa-se 50 kg por tonelada de ração (5%) para frangos finais. A composição inclui cálcio, fósforo e outros aditivos, conforme formulação padrão.', 1, NULL),
(24, 'Núcleo Inicial 5% 25kg ADM', 0.00, 0, 25, 'OUT024', 'nucleofrangoinicialadm.png', 'Núcleo para as primeiras fases da criação de aves, usado para garantir densidade de nutrientes desde cedo. Mistura recomendada: 5% do núcleo na dieta. Composição típica: vitaminas, minerais, aminoácidos essenciais.', 1, NULL),
(25, 'Núcleo Postura 4% 20kg ADM', 0.00, 0, 20, 'OUT025', 'nucleofrangoposturaadm.png', 'Núcleo mineral para aves poedeiras, formulado para fornecer os minerais, vitaminas e macroelementos necessários para postura eficiente e qualidade dos ovos. Misturar conforme recomendação. Composição: cálcio, fósforo, microelementos.', 1, NULL),
(26, 'Núcleo Suino Cresc 3% 30kg ADM', 0.00, 0, 30, 'OUT026', 'nucleosuinoadm.png', 'Núcleo indicado para suínos em fase de crescimento e terminação. A ADM recomenda 3% na mistura (por exemplo, 77% milho + 20% farelo de soja + 3% núcleo) para crescimento com 16% PB, depois para engorda com 14% PB. Composição: minerais, aminoácidos, proteína, cálcio e fósforo.', 1, NULL),
(27, 'Ração Caprino/Ovino 20kg', 0.00, 0, 20, 'OUT027', 'racaocaprinoovino.png', 'Ração completa para caprinos e ovinos, fornecendo nutrientes para manutenção, crescimento ou reprodução. Modo de uso: servir diariamente conforme peso e fase do animal. Composição: grãos, farelos, vitaminas, minerais idealizados para pequenos ruminantes.', 1, NULL),
(28, 'Ração Coelho 20kg Nutrimax', 0.00, 0, 20, 'OUT028', 'racaocoelhonutrimax.png', 'Formulação especializada para coelhos, com fontes de fibra (como feno), proteína vegetal, vitaminas e minerais. Ideal para alimentação balanceada. Servir diariamente, ajustando quantidades conforme idade e produção. Composição: feno, grãos, aditivos vitamínicos.', 1, NULL),
(29, 'Ração Engorda TRIT 20kg Nutrimax', 0.00, 0, 20, 'OUT029', 'racaoengordatritnutrimax.png', 'Destinada a animais que precisam de ganho rápido de peso (por exemplo, em produção); mistura energética e proteica. Pode ser usada como parte da dieta principal. Composição: grãos energéticos, proteína, aditivos para crescimento.', 1, NULL),
(30, 'Ração Inicial 20kg Nutrimax', 0.00, 0, 20, 'OUT030', 'racaoinicialnutrimax.png', 'Pensada para aves jovens, com densidade de nutrientes adequada para desenvolvimento precoce. Fornecer nos primeiros dias de vida ou conforme programa de criação. Composição: aminoácidos, vitaminas, minerais e cereais.', 1, NULL),
(31, 'Ração Kind Dog 15kg', 0.00, 0, 15, 'OUT031', 'racaokinddog.png', 'Ração para cães adultos “clássica”, com perfil nutricional equilibrado para manter peso, saúde do pelo e energia. Serve seco. Composição: cereais, proteína, gordura, vitaminas e minerais.', 1, NULL),
(32, 'Ração Peixe 28% 12mm 25kg', 0.00, 0, 25, 'OUT032', 'racaopeixes.png', 'Ração extrusada para peixes, especialmente para espécies que requerem proteína de 28%. Granulado de 8 mm que facilita ingestão por peixes de porte mediano. Modo de uso: alimentar 1–3 vezes ao dia conforme densidade de peixes. Composição: farinha de peixe, soja, óleo, vitaminas e minerais.', 1, NULL),
(33, 'Ração Peixe 28% 8mm 25kg', 0.00, 0, 25, 'OUT033', 'racaopeixes.png', 'Mesma fórmula de 28% de proteína, mas em pellet de 12 mm, indicado para peixes maiores. Composição igual à versão 8 mm, adaptada à granulometria.', 1, NULL),
(34, 'Ração Peixe 32% 5mm 25kg', 0.00, 0, 25, 'OUT034', 'racaopeixes.png', 'Alta proteína (32%) voltada para peixes em fase de crescimento rápido ou espécies exigentes. Granulado de 5 mm facilita para peixes pequenos. Composição: farinha de peixe, soja, óleo e nutrição balanceada.', 1, NULL),
(35, 'Ração Peixe 36% 3mm 25kg', 0.00, 0, 25, 'OUT035', 'racaopeixes.png', 'Versão com ainda mais proteína (36%) para peixes exigentes ou de crescimento intenso. Granulado de 3 mm, ideal para peixes pequenos ou alevinos maiores. Composição: proteína animal, ingredientes altamente digeríveis, vitaminas e minerais.', 1, NULL),
(36, 'Raticida Roden Isca Fresca Balde', 0.00, 0, 6, 'OUT036', 'raticida.png', 'Isca em pasta para controle de roedores, formulada para ser atrativa e eficaz. Utiliza-se colocando em pontos estratégicos no ambiente com atividade de roedores. Composição: anticoagulante (ou outro princípio ativo tóxico específico) e atrativos seguros para aplicação controlada.', 2, NULL),
(37, 'Sal Blokus 80 BK 12kg', 0.00, 0, 12, 'OUT037', 'salblokus80.jpg', 'Bloco mineral para bovinos, usado como sal mineral de livre acesso. Fonte de macro e microelementos, usado conforme necessidade para suplementação de minerais no cocho. Composição: NaCl + minerais (dependendo fórmula).', 2, NULL),
(38, 'Sal Blokus BK 6kg', 0.00, 0, 6, 'OUT038', 'salblokus6kg.jpg', 'Bloco mineral para bovinos, usado como sal mineral de livre acesso. Fonte de macro e microelementos, usado conforme necessidade para suplementação de minerais no cocho. Composição: NaCl + minerais (dependendo fórmula).', 2, NULL),
(39, 'Sal Comum Fino 25kg', 0.00, 0, 25, 'OUT039', 'salfino.png', 'Sal refinado tradicional, usado para suplementação mineral leve ou misturado em rações. Modo de uso: misturar ou fornecer como sal de cocho. Composição: cloreto de sódio puro ou quase puro.', 2, NULL),
(40, 'Sal Comum Grosso 25kg', 0.00, 0, 25, 'OUT040', 'salgrosso.png', 'Sal grosso tradicional, usado para suplementação mineral leve ou misturado em rações. Modo de uso: misturar ou fornecer como sal de cocho. Composição: cloreto de sódio puro ou quase puro.', 2, NULL),
(41, 'Silagem 28kg', 0.00, 0, 28, 'OUT041', 'silagem.jpg', 'Forragem fermentada (milho ou outros volumosos) embalada para uso animal. Serve como fonte de energia volumosa para ruminantes. Modo de uso: abrir e fornecer diretamente no cocho. Composição: planta fermentada (milho, gramíneas) com acidez controlada para preservação.', 2, NULL),
(42, 'Silagem 30kg', 0.00, 0, 30, 'OUT042', 'silagem.jpg', 'Forragem fermentada (milho ou outros volumosos) embalada para uso animal. Serve como fonte de energia volumosa para ruminantes. Modo de uso: abrir e fornecer diretamente no cocho. Composição: planta fermentada (milho, gramíneas) com acidez controlada para preservação.', 2, NULL),
(43, 'Suprasal Bovino 40x30kg', 0.00, 0, 30, 'OUT043', 'suprasalbovino.png', 'Suplemento mineral para bovinos de corte ou leite, desenvolvido para fornecer macro e microelementos essenciais. Segundo a Alisul, seus suplementos “Supra” são formulados para fases específicas, garantindo desempenho eficiente. Deve ser deixado disponível para consumo livre no cocho. Composição: cálcio, fósforo, sódio, minerais traço, etc.', 2, NULL),
(44, 'Suprasal Equino 10kg', 0.00, 0, 10, 'OUT044', 'suprasalequino.png', 'Bloco mineral para equinos, fornecendo sais e minerais importantes para o equilíbrio eletrolítico e a saúde óssea. Uso: deixar à disposição no cocho para os animais consumirem de forma natural. Composição: sais minerais balanceados.', 2, NULL),
(45, 'Suprasal Ovino/Caprino 10kg', 0.00, 0, 10, 'OUT045', 'suprasalcaprinoovino.png', 'Suplemento mineral para ovinos e caprinos, formulado para suas necessidades específicas. Fornecer à vontade no cocho. Composição: macro e microelementos essenciais para pequenos ruminantes.', 2, NULL),
(46, 'Ureia 25kg', 0.00, 0, 25, 'OUT046', 'ureia.jpg', 'Fonte de nitrogênio não protéico para ruminantes. Deve ser misturada ao volumoso (silagem, feno) com cuidado e sob orientação de nutricionista, pois o excesso pode ser tóxico. Utilizada para melhorar a síntese proteica microbiana no rúmen. Composição: ureia pura (CO(NH₂)₂).', 2, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE `pagamento` (
  `Id_pag` int(11) NOT NULL,
  `Data_pagamento_pag` date DEFAULT NULL,
  `Status_pag` varchar(20) NOT NULL,
  `Observacao_pag` varchar(50) DEFAULT NULL,
  `Id_func` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pagamento`
--

INSERT INTO `pagamento` (`Id_pag`, `Data_pagamento_pag`, `Status_pag`, `Observacao_pag`, `Id_func`) VALUES
(1, '2025-09-30', 'Concluído', 'Adiantamento salarial', 3),
(2, '2025-10-01', 'Concluído', 'Pagamento mensal referente a setembro', 2),
(3, '2025-10-05', 'Pendente', 'Aguardando confirmação bancária', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido`
--

CREATE TABLE `pedido` (
  `Id_ped` int(11) NOT NULL,
  `Valor_total_ped` decimal(12,2) NOT NULL,
  `Peso_total_ped` int(11) NOT NULL,
  `Data_entrega_ped` date DEFAULT NULL,
  `Id_cam` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedido`
--

INSERT INTO `pedido` (`Id_ped`, `Valor_total_ped`, `Peso_total_ped`, `Data_entrega_ped`, `Id_cam`) VALUES
(1, 1500.00, 1000, '2025-10-05', 1),
(2, 2500.00, 2000, '2025-10-06', 2),
(3, 1800.00, 1500, NULL, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido_produto`
--

CREATE TABLE `pedido_produto` (
  `Id_pedprod` int(11) NOT NULL,
  `Id_pes` int(11) DEFAULT NULL,
  `Id_ped` int(11) DEFAULT NULL,
  `Id_ens` int(11) DEFAULT NULL,
  `Id_out` int(11) DEFAULT NULL,
  `Id_end` int(11) NOT NULL,
  `Data_pedprod` date NOT NULL,
  `Status_pedprod` varchar(20) NOT NULL,
  `Quantidade_pedprod` int(11) NOT NULL,
  `Peso_total_pedprod` int(11) NOT NULL,
  `Valor_total_pedprod` decimal(12,2) DEFAULT NULL,
  `Metodo_pagamento_pedprod` varchar(50) NOT NULL,
  `Razao_social_pedprod` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedido_produto`
--

INSERT INTO `pedido_produto` (`Id_pedprod`, `Id_pes`, `Id_ped`, `Id_ens`, `Id_out`, `Id_end`, `Data_pedprod`, `Status_pedprod`, `Quantidade_pedprod`, `Peso_total_pedprod`, `Valor_total_pedprod`, `Metodo_pagamento_pedprod`, `Razao_social_pedprod`) VALUES
(1, 1, NULL, 11, NULL, 7, '2025-09-29', 'Em analise', 1, 24, 35.00, 'PIX', NULL),
(2, 2, NULL, 12, NULL, 7, '2025-09-29', 'Em analise', 1, 25, 37.50, 'Dinheiro', NULL),
(3, 3, NULL, 13, NULL, 7, '2025-09-29', 'Em analise', 1, 40, 60.00, 'Boleto', NULL),
(4, 4, NULL, 15, NULL, 7, '2025-09-29', 'Em orçamento', 1, 48, NULL, 'PIX', NULL),
(5, 5, NULL, 17, NULL, 7, '2025-09-29', 'Em orçamento', 1, 50, NULL, 'Boleto', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `Id_pes` int(11) NOT NULL,
  `Nome_pes` varchar(255) NOT NULL,
  `Telefone_pes` varchar(13) NOT NULL,
  `Email_pes` varchar(100) DEFAULT NULL,
  `Senha_pes` varchar(255) DEFAULT NULL,
  `Tipo_pes` varchar(30) NOT NULL,
  `Id_end` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoa`
--

INSERT INTO `pessoa` (`Id_pes`, `Nome_pes`, `Telefone_pes`, `Email_pes`, `Senha_pes`, `Tipo_pes`, `Id_end`) VALUES
(1, 'Ana Souza', '5511987654321', 'ana@email.com', NULL, 'Cliente', 7),
(2, 'Bruno Silva', '5511976543210', 'bruno@email.com', 'senha123', 'Vendedor', 1),
(3, 'Carlos Lima', '5511965432109', 'carlos@email.com', 'senha123', 'Cliente', 8),
(4, 'Diana Costa', '5511954321098', 'diana@email.com', NULL, 'Fornecedor', 2),
(5, 'Elisa Pereira', '5511943210987', 'elisa@email.com', 'senha123', 'Cliente', 9),
(6, 'Felipe Rocha', '5511932109876', 'felipe@email.com', 'senha123', 'Vendedor', 3),
(7, 'Gustavo Ferreira', '5511921098765', 'gustavo@email.com', NULL, 'Cliente/Fornecedor', 10),
(8, 'Heloisa Martins', '5511910987654', 'heloisa@email.com', 'senha123', 'Vendedor', 4),
(9, 'Igor Santos', '5511909876543', 'igor@email.com', 'senha123', 'Cliente/Fornecedor', 11),
(10, 'Juliana Oliveira', '5511998765432', 'juliana@email.com', 'senha123', 'Fornecedor', 5),
(11, 'manuella', '5515997586509', 'manu@email.com', '$2b$10$DWkeW6Swn5eOWU.SNDN/z.RP7KJwg7aFA/L6tFkshOvTInIDlbN7u', 'Vendedor', 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `Id_prod` int(11) NOT NULL,
  `Nome_prod` varchar(255) NOT NULL,
  `Preco_med_prod` decimal(10,2) NOT NULL,
  `Quantidade_prod` int(11) NOT NULL,
  `Codigo_prod` varchar(50) NOT NULL,
  `Foto_prod` varchar(50) DEFAULT NULL,
  `Descricao_prod` varchar(500) DEFAULT NULL,
  `Id_categ` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`Id_prod`, `Nome_prod`, `Preco_med_prod`, `Quantidade_prod`, `Codigo_prod`, `Foto_prod`, `Descricao_prod`, `Id_categ`) VALUES
(1, 'Arroz Parbolizado', 0.00, 0, 'P001', 'arrozparbolizado.png', 'O arroz parbolizado é um alimento complementar utilizado na nutrição de cães, conhecido por sua boa digestibilidade e aporte energético. É útil para compor dietas caseiras balanceadas ou para acompanhar a ração em casos de baixa ingestão alimentar.', NULL),
(2, 'Aveia achatada', 0.00, 0, 'P002', 'aveiaachatada.png', 'Trata-se de grãos de aveia prensados, de fácil digestão, uma fonte excelente de fibras solúveis (beta-glucanas), além de conter proteínas. É útil tanto para alimentação humana (mingaus, pães) quanto para animais (suplemento de fibra e energia). No uso animal, pode ser misturada à ração ou servida como “fardo” de aveia. Composição típica: aveia integral (carboidratos, lipídeos, fibras e proteína).', NULL),
(3, 'Farelo de algodão 38%', 0.00, 0, 'P003', 'fareloalgodao.jpg', 'Subproduto da extração de óleo do algodão, com teor proteico de aproximadamente 38%. Muito usado na nutrição de ruminantes como fonte de proteína. Para uso, mistura-se com volumosos (silagem, feno) ou com outros concentrados conforme a formulação nutricional. Composição: proteína bruta alta, fibras e alguns resíduos lipídicos naturais.', NULL),
(4, 'Farelo de soja', 0.00, 0, 'P004', 'farelosoja.png', 'É o resíduo da extração de óleo da soja, altamente protéico. É amplamente usado na nutrição animal como fonte principal de proteína para bovinos, suínos, aves. Deve ser misturado em rações balanceadas conforme a exigência nutricional. Sua composição é rica em aminoácidos essenciais, proteínas (~45–50%), fibras e um pouco de lipídio residual.', NULL),
(5, 'Farelo de Trigo', 0.00, 0, 'P005', 'farelotrigo.png', 'É o subproduto da moagem do trigo, rico em fibras e moderado em proteína. É útil para adicionar fibra e variar a fonte de energia nas dietas animais. Geralmente mistura-se no concentrado ou nas rações completas. Composição: fibra bruta, carboidratos (amido e resíduos), algumas proteínas.', NULL),
(6, 'Fuba Mimoso', 0.00, 0, 'P006', 'fubamimoso.png', 'O fubá mimoso é um alimento moído fino, produzido a partir do milho, destinado exclusivamente ao consumo animal. É utilizado como fonte de energia rápida e digestível em dietas de diversas espécies, principalmente aves, suínos e animais de pequeno porte.Para uso, pode ser misturado à ração ou oferecido como suplemento energético. Composição típica: carboidratos (amido), proteínas e fibras.', NULL),
(7, 'Fubazao', 0.00, 0, 'P007', 'fubazao.png', 'O fubazão é um produto derivado do milho, com moagem mais grossa que o fubá mimoso, indicado exclusivamente para alimentação animal. É muito utilizado em dietas de bovinos, equinos, aves e suínos, fornecendo energia de forma eficiente. Pode ser misturado à ração ou oferecido como suplemento energético. Composição típica: carboidratos (amido), proteínas e fibras.', NULL),
(8, 'Milho', 1.50, 500, 'P008', 'milho.jpg', 'Grãos inteiros de milho secos. Aplicação clássica como fonte energética em rações de ruminantes, aves, suínos, ou até para consumo humano (quando moído). Pode ser fornecido inteiro, quebrado ou moído. Composição: amido, lipídeos naturais, proteínas e fibras.', NULL),
(9, 'Milho Moído', 0.00, 0, 'P009', 'milhomoido.jpg', 'Milho triturado em partículas finas. Muito utilizado em ração para aves e suínos por ser facilmente digerível. Também pode ser usado para extrusão ou processamento de alimentos. Composição: milho integral, com alto amido, algumas fibras e proteínas.', NULL),
(10, 'Milho Quebrado', 0.00, 0, 'P010', 'milhoquebrado.jpeg', 'Grãos de milho partidos em pedaços médios ou grandes. É uma fonte muito usada em ração para aves maiores, suínos e pequenas misturas energéticas. Modo de uso: fornecer diretamente ou misturar em rações. Composição: amido, energia, parte de fibra conforme o tamanho do fragmento.', NULL),
(11, 'Quirera Fina Comum', 0.00, 0, 'P011', 'quireracomum.jpg', 'Fragmentos finos do milho, quase como farelo grosso. Usada para alimentar aves pequenas ou na mistura de rações onde se quer boa digestibilidade e densidade energética. Pode ser fornecida seca ou misturada. Composição: basicamente milho fragmentado (energia e carboidratos).', NULL),
(12, 'Quirera Grossa Comum', 0.00, 0, 'P012', 'quireracomum.jpg', 'Partes maiores de milho quebrado, menos processado. Utilizada em dietas de aves ou animais onde granulometria grossa é vantajosa. Uso: misturar à ração ou fornecer pura. Composição: fragmentos de milho (energia).', NULL),
(13, 'Quirera Media Comum', 0.00, 0, 'P013', 'quireracomum.jpg', 'Tamanho intermediário entre fina e grossa. Bom equilíbrio entre densidade, digestibilidade e custo. No uso, pode entrar em misturas ou rações completas. Composição: milho fragmentado.', NULL),
(14, 'Quirera Lavada G1', 0.00, 0, 'P014', 'quireralavada.jpg', 'Quirera que passou por lavagem para remover impurezas e poeiras. Ideal para rações mais “limpas” e seguras, especialmente para aves de alta performance. Modo de uso: servir diretamente ou misturar. Composição: milho fragmentado, lavada (menos sujeiras).', NULL),
(15, 'Quirera Lavada G2', 0.00, 0, 'P015', 'quireralavada.jpg', 'Granulometria levemente maior que a G1, também lavada para garantir pureza. Usada em rações onde se valoriza a limpeza do grão. Composição: milho fragmentado lavado.', NULL),
(16, 'Quirera Lavada G3', 0.00, 0, 'P016', 'quireralavada.jpg', 'Fragmentos maiores com processo de lavagem. Oferece boa energia e densidade, ideal para rações mais robustas. Composição: fragmentos limpos de milho.', NULL),
(17, 'Quirera Lavada G4', 0.00, 0, 'P017', 'quireralavada.jpg', 'Maior granulometria e purificação por lavagem. Excelente para dietas de suínos/bovinos que se beneficiam de grãos maiores e limpos. Composição: milho lavado e fragmentado.', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_ensacado`
--

CREATE TABLE `produto_ensacado` (
  `Id_ens` int(11) NOT NULL,
  `Nome_ens` varchar(255) NOT NULL,
  `Preco_ens` decimal(10,2) NOT NULL,
  `Peso_ens` int(11) NOT NULL,
  `Quantidade_ens` int(11) NOT NULL,
  `Codigo_ens` varchar(50) NOT NULL,
  `Foto_ens` varchar(50) DEFAULT NULL,
  `Id_prod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto_ensacado`
--

INSERT INTO `produto_ensacado` (`Id_ens`, `Nome_ens`, `Preco_ens`, `Peso_ens`, `Quantidade_ens`, `Codigo_ens`, `Foto_ens`, `Id_prod`) VALUES
(1, 'Arroz parbolizado', 0.00, 30, 0, 'ARP30', NULL, 1),
(2, 'Aveia achatada', 0.00, 20, 0, 'AVA20', NULL, 2),
(3, 'Farelo de algodão 38%', 0.00, 50, 0, 'FAG50', NULL, 3),
(4, 'Farelo de Soja 50kg', 0.00, 50, 0, 'FSJ50', NULL, 4),
(5, 'Farelo de Trigo 30kg', 0.00, 30, 0, 'FTR30', NULL, 5),
(6, 'Farelo de Trigo 40kg', 0.00, 40, 0, 'FTR40', NULL, 5),
(7, 'Fuba Mimoso 25kg', 0.00, 25, 0, 'FBM25', NULL, 6),
(8, 'Fubazao 24kg', 0.00, 24, 0, 'FBZ24', NULL, 7),
(9, 'Fubazao 40kg', 0.00, 40, 0, 'FBZ40', NULL, 7),
(10, 'Fubazao 48kg', 0.00, 48, 0, 'FBZ48', NULL, 7),
(11, 'Milho 24kg', 35.00, 24, 1, 'MEA24', NULL, 8),
(12, 'Milho 25kg', 37.50, 25, 1, 'MEA25', NULL, 8),
(13, 'Milho 40kg', 60.00, 40, 1, 'MEA40', NULL, 8),
(14, 'Milho 47kg', 70.50, 47, 1, 'MEA47', NULL, 8),
(15, 'Milho 48kg', 72.00, 48, 1, 'MEA48', NULL, 8),
(16, 'Milho 49kg', 73.50, 49, 1, 'MEA49', NULL, 8),
(17, 'Milho 50kg', 75.00, 50, 1, 'MEA50', NULL, 8),
(18, 'Milho Moído 24kg', 0.00, 24, 0, 'MMO24', NULL, 9),
(19, 'Milho Moído 40kg', 0.00, 40, 0, 'MMO40', NULL, 9),
(20, 'Milho Moído 48kg', 0.00, 48, 0, 'MMO48', NULL, 9),
(21, 'Milho Quebrado 24kg', 0.00, 24, 0, 'MQB24', NULL, 10),
(22, 'Milho Quebrado 40kg', 0.00, 40, 0, 'MQB40', NULL, 10),
(23, 'Milho Quebrado 48kg', 0.00, 48, 0, 'MQB48', NULL, 10),
(24, 'Quirera Fina Comum 25kg', 0.00, 25, 0, 'QRF25', NULL, 11),
(25, 'Quirera Grossa Comum 25kg', 0.00, 25, 0, 'QRG25', NULL, 12),
(26, 'Quirera Lavada G1 25kg', 0.00, 25, 0, 'QRL1', NULL, 14),
(27, 'Quirera Lavada G2 25kg', 0.00, 25, 0, 'QRL2', NULL, 15),
(28, 'Quirera Lavada G3 25kg', 0.00, 25, 0, 'QRL3', NULL, 16),
(29, 'Quirera Lavada G4 25kg', 0.00, 25, 0, 'QRL4', NULL, 17),
(30, 'Quirera Média Comum 25kg', 0.00, 25, 0, 'QRM25', NULL, 13);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_sistema`
--

CREATE TABLE `usuario_sistema` (
  `Id_user` int(11) NOT NULL,
  `Nome_user` varchar(20) NOT NULL,
  `Senha_user` varchar(20) NOT NULL,
  `cargo_user` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario_sistema`
--

INSERT INTO `usuario_sistema` (`Id_user`, `Nome_user`, `Senha_user`, `cargo_user`) VALUES
(1, 'Tiago', 'admin', 'administrador');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `caminhao`
--
ALTER TABLE `caminhao`
  ADD PRIMARY KEY (`Id_cam`);

--
-- Índices de tabela `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`Id_car`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`Id_categ`);

--
-- Índices de tabela `email_verification`
--
ALTER TABLE `email_verification`
  ADD PRIMARY KEY (`id_ema`),
  ADD KEY `email_ema` (`email_ema`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`Id_end`);

--
-- Índices de tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`Id_func`),
  ADD UNIQUE KEY `cpf_func` (`cpf_func`),
  ADD KEY `fk_cargo` (`Id_car`);

--
-- Índices de tabela `outros_produtos`
--
ALTER TABLE `outros_produtos`
  ADD PRIMARY KEY (`Id_out`),
  ADD KEY `fk_categoria_outros` (`Id_categ`),
  ADD KEY `fk_prod_outro` (`Id_prod`);

--
-- Índices de tabela `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`Id_pag`),
  ADD KEY `fk_funcionario` (`Id_func`);

--
-- Índices de tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`Id_ped`),
  ADD KEY `fk_caminhao_pedido` (`Id_cam`);

--
-- Índices de tabela `pedido_produto`
--
ALTER TABLE `pedido_produto`
  ADD PRIMARY KEY (`Id_pedprod`),
  ADD KEY `fk_usuario_produto` (`Id_pes`),
  ADD KEY `fk_pedido` (`Id_ped`),
  ADD KEY `fk_produto_ensacado` (`Id_ens`),
  ADD KEY `fk_outros_produtos` (`Id_out`),
  ADD KEY `fk_endereco_pedido` (`Id_end`);

--
-- Índices de tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`Id_pes`),
  ADD UNIQUE KEY `Email_pes` (`Email_pes`),
  ADD KEY `fk_endereco` (`Id_end`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`Id_prod`),
  ADD UNIQUE KEY `Codigo_prod` (`Codigo_prod`),
  ADD KEY `fk_categoria_outros` (`Id_categ`);

--
-- Índices de tabela `produto_ensacado`
--
ALTER TABLE `produto_ensacado`
  ADD PRIMARY KEY (`Id_ens`),
  ADD UNIQUE KEY `Codigo_ens` (`Codigo_ens`),
  ADD KEY `fk_prod` (`Id_prod`);

--
-- Índices de tabela `usuario_sistema`
--
ALTER TABLE `usuario_sistema`
  ADD PRIMARY KEY (`Id_user`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `caminhao`
--
ALTER TABLE `caminhao`
  MODIFY `Id_cam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `cargo`
--
ALTER TABLE `cargo`
  MODIFY `Id_car` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `Id_categ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `email_verification`
--
ALTER TABLE `email_verification`
  MODIFY `id_ema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `Id_end` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `Id_func` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `outros_produtos`
--
ALTER TABLE `outros_produtos`
  MODIFY `Id_out` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `Id_pag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `Id_ped` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `pedido_produto`
--
ALTER TABLE `pedido_produto`
  MODIFY `Id_pedprod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `Id_pes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `Id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `produto_ensacado`
--
ALTER TABLE `produto_ensacado`
  MODIFY `Id_ens` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `usuario_sistema`
--
ALTER TABLE `usuario_sistema`
  MODIFY `Id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `funcionario`
--
ALTER TABLE `funcionario`
  ADD CONSTRAINT `fk_cargo` FOREIGN KEY (`Id_car`) REFERENCES `cargo` (`Id_car`);

--
-- Restrições para tabelas `outros_produtos`
--
ALTER TABLE `outros_produtos`
  ADD CONSTRAINT `fk_categoria_outros` FOREIGN KEY (`Id_categ`) REFERENCES `categoria` (`Id_categ`),
  ADD CONSTRAINT `fk_prod_outro` FOREIGN KEY (`Id_prod`) REFERENCES `produto` (`Id_prod`);

--
-- Restrições para tabelas `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `fk_funcionario` FOREIGN KEY (`Id_func`) REFERENCES `funcionario` (`Id_func`);

--
-- Restrições para tabelas `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_caminhao_pedido` FOREIGN KEY (`Id_cam`) REFERENCES `caminhao` (`Id_cam`);

--
-- Restrições para tabelas `pedido_produto`
--
ALTER TABLE `pedido_produto`
  ADD CONSTRAINT `fk_endereco_pedido` FOREIGN KEY (`Id_end`) REFERENCES `endereco` (`Id_end`),
  ADD CONSTRAINT `fk_outros_produtos` FOREIGN KEY (`Id_out`) REFERENCES `outros_produtos` (`Id_out`),
  ADD CONSTRAINT `fk_pedido` FOREIGN KEY (`Id_ped`) REFERENCES `pedido` (`Id_ped`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_produto_ensacado` FOREIGN KEY (`Id_ens`) REFERENCES `produto_ensacado` (`Id_ens`),
  ADD CONSTRAINT `fk_usuario_produto` FOREIGN KEY (`Id_pes`) REFERENCES `pessoa` (`Id_pes`);

--
-- Restrições para tabelas `pessoa`
--
ALTER TABLE `pessoa`
  ADD CONSTRAINT `fk_endereco` FOREIGN KEY (`Id_end`) REFERENCES `endereco` (`Id_end`);

--
-- Restrições para tabelas `produto_ensacado`
--
ALTER TABLE `produto_ensacado`
  ADD CONSTRAINT `fk_prod` FOREIGN KEY (`Id_prod`) REFERENCES `produto` (`Id_prod`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

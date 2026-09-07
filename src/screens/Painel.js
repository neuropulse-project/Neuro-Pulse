// Tela de dados detalhados: alterna Dia/Semana/Mês (visual) e mostra
// frequência cardíaca média (linha) e minutos de atividade (barras em
// gradiente), além de cartões rápidos de estresse e sono.

import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import Svg, { Path, Line, Rect, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";
import styles, { orangeGradient } from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Dados mockados (mock) — numa versão real viriam da smartband/backend.
const DIAS = ["S", "T", "Q", "Q", "S", "S", "D"];
const FREQUENCIA = [70, 76, 73, 80, 74, 78, 72];
const ATIVIDADE = [0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.75];

// Monta a data de hoje por extenso, em português.
function dataDeHoje() {
  const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const hoje = new Date();
  const nomeDia = dias[hoje.getDay()];
  const capitalizado = nomeDia.charAt(0).toUpperCase() + nomeDia.slice(1);
  return `${capitalizado}, ${hoje.getDate()} de ${meses[hoje.getMonth()]}`;
}

// Converte a série em pontos {x,y}, já com margem interna de segurança.
function pontosDaSerie(serie, largura, altura, margem = 10) {
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const passoX = largura / (serie.length - 1);
  return serie.map((valor, i) => ({
    x: i * passoX,
    y: margem + (altura - margem * 2) - ((valor - min) / (max - min || 1)) * (altura - margem * 2),
  }));
}

// Gera uma curva suave (Catmull-Rom) passando pelos pontos da série.
function linhaSuave(pontos) {
  if (pontos.length < 2) return "";
  let d = `M ${pontos[0].x},${pontos[0].y}`;
  for (let i = 0; i < pontos.length - 1; i++) {
    const p0 = pontos[i === 0 ? i : i - 1];
    const p1 = pontos[i];
    const p2 = pontos[i + 1];
    const p3 = pontos[i + 2 < pontos.length ? i + 2 : i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export default function Painel() {
  // Estado do seletor Dia/Semana/Mês (só visual por enquanto).
  const [periodo, setPeriodo] = useState("Semana");

  const chartW = 300;
  const chartH = 80;
  const pontos = pontosDaSerie(FREQUENCIA, chartW, chartH);
  const linhaPath = linhaSuave(pontos);
  const areaPath = `${linhaPath} L ${chartW},${chartH} L 0,${chartH} Z`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Título da tela. */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Seus dados</Text>
            <Text style={styles.headerSubtitle}>{dataDeHoje()}</Text>
          </View>
        </View>

        {/* Seletor de período: Dia / Semana / Mês. */}
        <View style={localStyles.segmentRow}>
          {["Dia", "Semana", "Mês"].map((opcao) => {
            const ativo = opcao === periodo;
            return (
              <TouchableOpacity
                key={opcao}
                style={[localStyles.segmentItem, ativo && localStyles.segmentItemActive]}
                onPress={() => setPeriodo(opcao)}
              >
                <Text style={[localStyles.segmentText, ativo && localStyles.segmentTextActive]}>
                  {opcao}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Card: frequência cardíaca média, com a linha "grampeada" ao card. */}
        <View style={[styles.card, { marginTop: 18 }]}>
          <View style={localStyles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Frequência cardíaca média</Text>
            <View style={[styles.badge, { backgroundColor: colors.zenBg }]}>
              <Text style={[styles.badgeText, { color: colors.zen }]}>-3%</Text>
            </View>
          </View>
          <Text style={localStyles.bigValue}>
            74 <Text style={localStyles.bigUnit}>bpm</Text>
          </Text>

          <Svg width={chartW} height={chartH} style={{ marginTop: 14 }}>
            <Defs>
              <LinearGradient id="areaFreq" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={colors.heart} stopOpacity={0.28} />
                <Stop offset="1" stopColor={colors.heart} stopOpacity={0} />
              </LinearGradient>
              {/* Recorte que impede a linha/área de "vazar" para fora do card. */}
              <ClipPath id="limiteGrafico">
                <Rect x="0" y="0" width={chartW} height={chartH} />
              </ClipPath>
            </Defs>

            <Line
              x1="0"
              y1={chartH * 0.42}
              x2={chartW}
              y2={chartH * 0.42}
              stroke={colors.border}
              strokeWidth={1}
              strokeDasharray="4 5"
            />

            {/* Área e linha desenhadas dentro do clip, nunca ultrapassam o card. */}
            <Path d={areaPath} fill="url(#areaFreq)" stroke="none" clipPath="url(#limiteGrafico)" />
            <Path
              d={linhaPath}
              fill="none"
              stroke={colors.heart}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              clipPath="url(#limiteGrafico)"
            />
          </Svg>
          <View style={localStyles.axisRow}>
            {DIAS.map((d, i) => (
              <Text key={i} style={localStyles.axisLabel}>{d}</Text>
            ))}
          </View>
        </View>

        {/* Card: minutos de atividade, barras em cápsula com gradiente laranja. */}
        <View style={[styles.card, { marginTop: 16 }]}>
          <View style={localStyles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Minutos de atividade</Text>
            <View style={[styles.badge, { backgroundColor: colors.orangeSoft }]}>
              <Text style={[styles.badgeText, { color: colors.orange }]}>Meta batida</Text>
            </View>
          </View>
          <Text style={localStyles.bigValue}>
            42 <Text style={localStyles.bigUnit}>min hoje</Text>
          </Text>

          <View style={localStyles.barsRow}>
            {ATIVIDADE.map((v, i) => (
              <View key={i} style={localStyles.barTrack}>
                <Svg width={22} height={70} style={{ position: "absolute", bottom: 0 }}>
                  <Defs>
                    <LinearGradient id={`barGrad-${i}`} x1="0" y1="1" x2="0" y2="0">
                      {orangeGradient.stops.map((s, idx) => (
                        <Stop key={idx} offset={s.offset} stopColor={s.color} />
                      ))}
                    </LinearGradient>
                  </Defs>
                  <Rect x="0" y={70 - 70 * v} width="22" height={70 * v} fill={`url(#barGrad-${i})`} />
                </Svg>
              </View>
            ))}
          </View>
          <View style={localStyles.axisRow}>
            {DIAS.map((d, i) => (
              <Text key={i} style={localStyles.axisLabel}>{d}</Text>
            ))}
          </View>
        </View>

        {/* Cards pequenos: estresse e sono. */}
        <View style={localStyles.smallRow}>
          <View style={[styles.card, localStyles.smallCard]}>
            <View style={localStyles.dotRow}>
              <View style={[localStyles.miniDot, { backgroundColor: colors.zen }]} />
              <Text style={localStyles.smallLabel}>Estresse</Text>
            </View>
            <Text style={[localStyles.smallValue, { color: colors.text }]}>Baixo</Text>
          </View>

          <View style={[styles.card, localStyles.smallCard]}>
            <View style={localStyles.dotRow}>
              <View style={[localStyles.miniDot, { backgroundColor: colors.moon }]} />
              <Text style={localStyles.smallLabel}>Sono</Text>
            </View>
            <Text style={[localStyles.smallValue, { color: colors.text }]}>7h 52m</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela (o que não está no dashboard.styles.js).
const localStyles = {
  segmentRow: {
    flexDirection: "row",
    backgroundColor: "#F1F2F6",
    borderRadius: 14,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  segmentItemActive: {
    backgroundColor: colors.navy,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
  },
  segmentTextActive: {
    color: colors.white,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bigValue: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    marginTop: 2,
  },
  bigUnit: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
  },
  axisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  axisLabel: {
    fontSize: 11,
    color: colors.muted,
    width: 20,
    textAlign: "center",
  },
  barsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 70,
    marginTop: 14,
  },
  barTrack: {
    width: 22,
    height: "100%",
    borderRadius: 11,
    backgroundColor: "#F2ECDD",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  smallCard: {
    width: "48%",
  },
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  smallLabel: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
  },
  smallValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 8,
  },
};

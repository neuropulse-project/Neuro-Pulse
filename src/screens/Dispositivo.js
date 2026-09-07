// 1ª tela da sequência de apresentação, exibida após o Login ou Cadastro.
// Mostra o mockup da smartband e o texto de proposta de valor. Estilos
// compartilhados com Apresentacao2/3/4 vêm de "apresentacao.styles.js".

// Imports de componentes, estilos e cores.
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import styles from "../styles/apresentacao.styles";
import colors from "../theme/colors";

export default function Dispositivo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status do sistema. */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar para a tela anterior no histórico. */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={10}
      >
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      {/* Conteúdo central: mockup da smartband + título + descrição. */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/imagens/Smartband.png")}
          style={styles.mockup}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          <Text style={styles.titleNavy}>Conheça seu </Text>
          <Text style={styles.titleOrange}>padrão</Text>
          <Text style={styles.titleNavy}> de </Text>
          <Text style={styles.titleOrange}>bem-estar</Text>
        </Text>

        <Text style={styles.description}>
          O NeuroPulse monitora seus sinais fisiológicos em tempo real para identificar
          alterações e promover equilíbrio.
        </Text>
      </View>

      {/* Rodapé: dots indicando a posição (1 de 4) + botão de avançar. */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Apresentacao2")}
        >
          <Text style={styles.nextArrow}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

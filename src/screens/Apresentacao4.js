// 4ª e última tela da apresentação (após Apresentacao3.js). Destaca o
// equilíbrio/bem-estar diário e encerra o fluxo levando ao app logado
// (MainTabs). Estilos compartilhados vêm de "apresentacao.styles.js".

// Imports de componentes, estilos e cores.
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import styles from "../styles/apresentacao.styles";
import colors from "../theme/colors";

export default function Apresentacao4({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status do sistema. */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar para a tela anterior (Apresentacao3). */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={10}
      >
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      {/* Conteúdo central: foto de equilíbrio + título + descrição. */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/imagens/HeroEquilibrio.png")}
          style={styles.mockup}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          <Text style={styles.titleNavy}>Fique em </Text>
          <Text style={styles.titleOrange}>equilíbrio</Text>
          <Text style={styles.titleNavy}> todos os dias</Text>
        </Text>

        <Text style={styles.description}>
          Receba alertas de estresse e pausas recomendadas ao longo do dia, para manter
          seu corpo e sua mente em sintonia.
        </Text>
      </View>

      {/* Rodapé: dots indicando a posição (4 de 4) + botão de concluir. */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.nextArrow}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

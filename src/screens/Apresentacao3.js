// 3ª tela da sequência de apresentação (após Apresentacao2.js). Destaca o
// monitoramento da qualidade do sono. Estilos compartilhados vêm de
// "apresentacao.styles.js".

// Imports de componentes, estilos e cores.
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import styles from "../styles/apresentacao.styles";
import colors from "../theme/colors";

export default function Apresentacao3({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status do sistema. */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar para a tela anterior (Apresentacao2). */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={10}
      >
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      {/* Conteúdo central: card de resumo diário + título + descrição. */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/imagens/HeroSono.png")}
          style={styles.mockup}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          <Text style={styles.titleOrange}>Bio-sicronização</Text>
          <br></br>
          <Text style={styles.titleNavy}>inteligente</Text>
        </Text>

        <Text style={styles.description}>
          Nosso sistema analisa seus dados e gera insights personalizados para equilibrar nome e mente
        </Text>
      </View>

      {/* Rodapé: dots indicando a posição (3 de 4) + botão de avançar. */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Apresentacao4")}
        >
          <Text style={styles.nextArrow}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

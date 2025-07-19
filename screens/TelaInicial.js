import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

// Paleta de cores do tema escuro
const cores = {
  fundo: '#121212',
  fundoSecundario: '#1E1E1E',
  fundoCard: '#2D2D2D',
  texto: '#FFFFFF',
  textoSecundario: '#B3B3B3',
  accent: '#BB86FC',
  accentSecundario: '#03DAC6',
  borda: '#3D3D3D',
  overlay: 'rgba(18, 18, 18, 0.8)',
};

const TelaInicial = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/animeFundo.jpg')} // Substitua pelo nome da sua imagem de fundo
      style={styles.background}
    >
      {/* Overlay escuro para melhor legibilidade */}
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../assets/mangaforfree.png')}
            style={styles.logoImagem}
            resizeMode="contain"
          />

          <View style={styles.textoContainer}>
            <Text style={styles.titulo}>MangaForFree</Text>
            <Text style={styles.subtexto}>
              Bem-vindo(a) ao mais moderno aplicativo de mangás do mundo.
              Descubra histórias incríveis e explore universos fantásticos.
            </Text>
          </View>

          <View style={styles.botoesContainer}>
           
            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => navigation.navigate('MangaList')}
            >
              <Text style={styles.textoBotaoSecundario}>Ver Catálogo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rodape}>
            <Text style={styles.textoRodape}>
              Acesse nosso Instagram: @MangaForFree
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: cores.overlay,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  logoImagem: {
    width: 220,
    height: 100,
    marginBottom: 20,
    // Adicionar sombra para destacar no fundo
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  textoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: cores.accent,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtexto: {
    fontSize: 18,
    fontWeight: '500',
    color: cores.texto,
    textAlign: 'center',
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  botoesContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  botaoPrincipal: {
    backgroundColor: cores.accent,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    elevation: 5,
    shadowColor: cores.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  textoBotaoPrincipal: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: cores.accentSecundario,
  },
  textoBotaoSecundario: {
    color: cores.accentSecundario,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  rodape: {
    paddingBottom: 20,
  },
  textoRodape: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TelaInicial;


import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const larguraTela = Dimensions.get('window').width;
const larguraCard = (larguraTela - 30) / 2;

// Cores de fundo para os cards - versões escuras
const coresDeFundo = ['#FF8A50', '#9C27B0', '#26A69A', '#2196F3', '#F44336', '#FFC107'];

// Paleta de cores do tema escuro
const cores = {
  fundo: '#121212',
  fundoSecundario: '#1E1E1E',
  fundoCard: '#2D2D2D',
  texto: '#FFFFFF',
  textoSecundario: '#B3B3B3',
  textoTerciario: '#808080',
  accent: '#BB86FC',
  borda: '#3D3D3D',
};

const CardMangas = ({ manga, onPress, index }) => {
  const corFundo = coresDeFundo[index % coresDeFundo.length];

  return (
    <TouchableOpacity style={[styles.card, { width: larguraCard }]} onPress={onPress}>
<View style={[styles.imagemContainer, { backgroundColor: corFundo }]}>
  <Image
    source={
      manga?.imagem
        ? { uri: manga.imagem }
        : require('../assets/animeFundo.jpg') // caminho da imagem local de fallback
    }
    style={styles.imagem}
    resizeMode="cover"
  />
</View>
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{manga.titulo}</Text>
        <Text style={styles.autor} numberOfLines={1}>{manga.autor}</Text>
        <View style={styles.detalhes}>
          <Text style={styles.volumes}>{manga.volumes} volumes</Text>
          <Text style={styles.demografico}>{manga.demografico}</Text>
        </View>
        <View style={styles.tags}>
          {manga.genero.split(",").slice(0, 2).map((genero, idx) => (
            <Text key={idx} style={styles.tag}>{genero.trim()}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: cores.fundoCard,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  imagemContainer: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 12,
    backgroundColor: cores.fundoCard,
  },
  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  autor: {
    fontSize: 12,
    color: cores.textoSecundario,
    marginBottom: 6,
  },
  detalhes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  volumes: {
    fontSize: 11,
    color: cores.textoTerciario,
  },
  demografico: {
    fontSize: 11,
    color: cores.accent,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: cores.fundoSecundario,
    color: cores.textoSecundario,
    borderWidth: 1,
    borderColor: cores.borda,
  },
});

export default CardMangas;

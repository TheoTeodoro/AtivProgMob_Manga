import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import mangaService from '../servicos/ApiService';

const TelaDetalheManga = ({ route, navigation }) => {
  const { mId } = route.params;
  const [manga, setManga] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarManga = async () => {
      try {
        const dados = await mangaService.buscarMangas();
        const mangaEncontrado = dados.find(m => m.id === mId);
        setManga(mangaEncontrado);
      } catch (erro) {
        console.error("Erro ao carregar manga, kumenasai onichaaan :(", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarManga();
  }, [mId]);

 const baixarPDF = async () => {
  try {
    // Carrega o asset do PDF local
    const asset = Asset.fromModule(require('../assets/simula_volume.pdf'));
    await asset.downloadAsync(); // Garante que o asset esteja disponível

    // --- Lógica Específica para cada Plataforma ---

    if (Platform.OS === 'web') {
      // LÓGICA PARA WEB
      // Na web, iniciamos o download diretamente através de um link.
      const link = document.createElement('a');
      link.href = asset.uri;
      link.download = 'simula_volume.pdf'; // Nome do arquivo que será baixado
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpa o link da página

    } else {
      // LÓGICA PARA MOBILE (Android/iOS)
      const caminhoDestino = `${FileSystem.documentDirectory}simula_volume.pdf`;

      // Copia o arquivo do bundle do app para o diretório de documentos
      await FileSystem.copyAsync({
        from: asset.localUri || asset.uri, // Usa localUri se disponível
        to: caminhoDestino,
      });

      console.log('PDF salvo em:', caminhoDestino);

      // Verifica se o compartilhamento está disponível e compartilha o arquivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(caminhoDestino, {
          mimeType: 'application/pdf',
          dialogTitle: 'Compartilhar PDF',
        });
      } else {
        Alert.alert('Download Concluído', 'Arquivo salvo em: ' + caminhoDestino);
      }
    }
  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
    Alert.alert('Erro', 'Falha ao baixar o PDF. Verifique os logs para mais detalhes.');
  }
};
  if (carregando || !manga) {
    return (
      <View style={estilos.container}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container}>
      <View style={[estilos.imagemContainer, { backgroundColor: '#a4a4ec' }]}>
        <Image source={{ uri: manga.imagem }} style={estilos.imagemGrande} />
      </View>

      <View style={estilos.conteudo}>
        <View style={estilos.headerManga}>
          <Text style={estilos.nome}>{manga.titulo}</Text>
        </View>

        <Text style={estilos.raca}>{manga.autor}</Text>

        {/* Botão Baixar volumes no topo */}
        <TouchableOpacity
          style={estilos.botaoBaixar}
          onPress={baixarPDF}
        >
          <Text style={estilos.textoBaixar}>Baixar volumes</Text>
        </TouchableOpacity>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Gênero</Text>
            <Text style={estilos.infoTexto}>{manga.genero}</Text>
          </View>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Volumes</Text>
            <Text style={estilos.infoTexto}>{manga.volumes}</Text>
          </View>
        </View>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Iniciado</Text>
            <Text style={estilos.infoTexto}>{manga.iniciado}</Text>
          </View>
          <View style={estilos.infoBox}>
            <Text style={estilos.infoTitulo}>Demográfico</Text>
            <Text style={estilos.infoTexto}>{manga.demografico}</Text>
          </View>
        </View>

        <View style={estilos.infoLinha}>
          <View style={estilos.infoBoxcastra}>
            <Text style={estilos.infoTitulo}>Circulação Mundial</Text>
            <Text style={estilos.infoTexto}>{manga.circulacao_mundial.toLocaleString()}</Text>
          </View>
        </View>

        <View style={estilos.ownerBox}>
          <Image source={require('../assets/autor.png')} style={estilos.ownerAvatar} />
          <View>
            <Text style={estilos.ownerNome}>{manga.autor}</Text>
            <Text style={estilos.ownerLocal}>Autor do Mangá</Text>
          </View>
         
        </View>

        <View style={[estilos.imagemContainer, { backgroundColor: '#a4a4ec' }]}>
          <Image source={{ uri: manga.imagem }} style={estilos.imagemGrande1} />
        </View>

        <Text style={estilos.tituloSecao}>Sinopse</Text>
        <Text style={estilos.texto}>{manga.sinopse}</Text>

        <Text style={estilos.tituloSecao}>Requisitos:</Text>
        <Text style={estilos.texto}>{manga.requisitos}</Text>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  imagemContainer: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    overflow: 'hidden'
  },
  imagemGrande: {
    width: '100%',
    height: 300
  },
  imagemGrande1: {
    width: '100%',
    height: 300,
    marginTop: 20
  },
  conteudo: {
    padding: 20
  },
  headerManga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  raca: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  infoBox: {
    width: '48%',
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center'
  },
  infoBoxcastra: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center'
  },
  infoTitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  infoTexto: {
    fontSize: 16,
    fontWeight: '600'
  },
  ownerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },
  ownerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  ownerNome: {
    fontWeight: 'bold'
  },
  ownerLocal: {
    color: '#999',
    fontSize: 12
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff'
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: '#ccc',
    textAlign: 'justify',
    marginBottom: 20
  },
  botaoBaixar: {
    backgroundColor: '#BB86FC',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20
  },
  textoBaixar: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF'
  }
});

export default TelaDetalheManga;

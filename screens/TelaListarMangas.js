import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import mangaService from '../servicos/ApiService';
import CardMangas from '../components/CardMangas';

const TelaListarMangas = ({ navigation }) => {
  const [mangas, setMangas] = useState([]);
  const [mangasFiltrados, setMangasFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');
  
  // Estados para os modais de filtro
  const [modalGeneroVisivel, setModalGeneroVisivel] = useState(false);
  const [modalAutorVisivel, setModalAutorVisivel] = useState(false);
  
  // Estados para listas de gêneros e autores
  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  
  // Estados para filtros ativos
  const [generoSelecionado, setGeneroSelecionado] = useState(null);
  const [autorSelecionado, setAutorSelecionado] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await mangaService.buscarMangas();
        const listaGeneros = mangaService.obterGeneros();
        const listaAutores = mangaService.obterAutores();
        
        setMangas(dados);
        setMangasFiltrados(dados);
        setGeneros(listaGeneros);
        setAutores(listaAutores);
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  // Função para aplicar filtros
  const aplicarFiltros = () => {
    let resultado = [...mangas];

    if (generoSelecionado) {
      resultado = mangaService.filtrarPorGenero(generoSelecionado);
    }

    if (autorSelecionado) {
      resultado = resultado.filter(manga => 
        manga.autor.toLowerCase() === autorSelecionado.toLowerCase()
      );
    }

    setMangasFiltrados(resultado);
  };

  // Efeito para aplicar filtros quando gênero ou autor mudam
  useEffect(() => {
    aplicarFiltros();
  }, [generoSelecionado, autorSelecionado]);

  // Função para resetar filtros
  const resetarFiltros = () => {
    setGeneroSelecionado(null);
    setAutorSelecionado(null);
    setFiltroSelecionado('Todos');
    setMangasFiltrados(mangas);
  };

  // Função para selecionar gênero
  const selecionarGenero = (genero) => {
    setGeneroSelecionado(genero);
    setAutorSelecionado(null); // Reset autor quando seleciona gênero
    setFiltroSelecionado('Genero');
    setModalGeneroVisivel(false);
  };

  // Função para selecionar autor
  const selecionarAutor = (autor) => {
    setAutorSelecionado(autor);
    setGeneroSelecionado(null); // Reset gênero quando seleciona autor
    setFiltroSelecionado('Autores');
    setModalAutorVisivel(false);
  };

  if (carregando) {
    return (
      <SafeAreaView style={estilos.container}>
        <View style={estilos.carregandoContainer}>
          <Text style={estilos.textoCarregando}>Carregando...um momento...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        {/* Filtros principais */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={estilos.filtros}
          contentContainerStyle={estilos.filtrosContainer}
        >
          <TouchableOpacity
            onPress={resetarFiltros}
            style={[
              estilos.botaoFiltro,
              filtroSelecionado === 'Todos' && estilos.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                estilos.textoFiltro,
                filtroSelecionado === 'Todos' && estilos.textoSelecionado,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalGeneroVisivel(true)}
            style={[
              estilos.botaoFiltro,
              filtroSelecionado === 'Genero' && estilos.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                estilos.textoFiltro,
                filtroSelecionado === 'Genero' && estilos.textoSelecionado,
              ]}
            >
              {generoSelecionado || 'Gênero'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalAutorVisivel(true)}
            style={[
              estilos.botaoFiltro,
              filtroSelecionado === 'Autores' && estilos.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                estilos.textoFiltro,
                filtroSelecionado === 'Autores' && estilos.textoSelecionado,
              ]}
            >
              {autorSelecionado || 'Autor'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Indicador de filtro ativo */}
        {(generoSelecionado || autorSelecionado) && (
          <View style={estilos.indicadorFiltro}>
            <Text style={estilos.textoIndicador}>
              {generoSelecionado && `Gênero: ${generoSelecionado}`}
              {autorSelecionado && `Autor: ${autorSelecionado}`}
            </Text>
            <TouchableOpacity onPress={resetarFiltros} style={estilos.botaoLimpar}>
              <Text style={estilos.textoLimpar}>Limpar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de mangás */}
        <FlatList
          data={mangasFiltrados}
          renderItem={({ item, index }) => (
            <CardMangas
              manga={item}
              index={index}
              onPress={() => navigation.navigate("DetalheManga", { mId: item.id })}
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={estilos.lista}
          style={estilos.flatList}
          showsVerticalScrollIndicator={true}
          bounces={true}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
          ListEmptyComponent={() => (
            <View style={estilos.listaVazia}>
              <Text style={estilos.textoListaVazia}>
                Nenhum mangá encontrado com os filtros selecionados.
              </Text>
            </View>
          )}
        />

        {/* Modal de seleção de gênero */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalGeneroVisivel}
          onRequestClose={() => setModalGeneroVisivel(false)}
        >
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalContainer}>
              <View style={estilos.modalHeader}>
                <Text style={estilos.modalTitulo}>Selecionar Gênero</Text>
                <TouchableOpacity 
                  onPress={() => setModalGeneroVisivel(false)}
                  style={estilos.botaoFechar}
                >
                  <Text style={estilos.textoFechar}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={estilos.modalLista}>
                {generos.map((genero, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selecionarGenero(genero)}
                    style={estilos.itemModal}
                  >
                    <Text style={estilos.textoItemModal}>{genero}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal de seleção de autor */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalAutorVisivel}
          onRequestClose={() => setModalAutorVisivel(false)}
        >
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalContainer}>
              <View style={estilos.modalHeader}>
                <Text style={estilos.modalTitulo}>Selecionar Autor</Text>
                <TouchableOpacity 
                  onPress={() => setModalAutorVisivel(false)}
                  style={estilos.botaoFechar}
                >
                  <Text style={estilos.textoFechar}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={estilos.modalLista}>
                {autores.map((autor, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selecionarAutor(autor)}
                    style={estilos.itemModal}
                  >
                    <Text style={estilos.textoItemModal}>{autor}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// TEMA ESCURO - Paleta de cores
const cores = {
  fundo: '#121212',           // Fundo principal escuro
  fundoSecundario: '#1E1E1E', // Fundo secundário
  fundoCard: '#2D2D2D',       // Fundo dos cards
  texto: '#FFFFFF',           // Texto principal branco
  textoSecundario: '#B3B3B3', // Texto secundário cinza claro
  textoTerciario: '#808080',  // Texto terciário cinza
  accent: '#BB86FC',          // Cor de destaque roxa
  accentSecundario: '#03DAC6', // Cor de destaque secundária
  erro: '#CF6679',            // Cor de erro
  sucesso: '#4CAF50',         // Cor de sucesso
  aviso: '#FF9800',           // Cor de aviso
  borda: '#3D3D3D',           // Cor das bordas
  overlay: 'rgba(0, 0, 0, 0.7)', // Overlay dos modais
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    fontSize: 16,
    color: cores.textoSecundario,
  },
  filtros: {
    maxHeight: 50,
    marginBottom: 10,
  },
  filtrosContainer: {
    paddingHorizontal: 5,
  },
  botaoFiltro: {
    backgroundColor: cores.fundoCard,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoFiltro: {
    fontSize: 13,
    color: cores.textoSecundario,
    textAlign: 'center',
  },
  botaoSelecionado: {
    backgroundColor: cores.accent,
    borderColor: cores.accent,
  },
  textoSelecionado: {
    color: cores.texto,
    fontWeight: 'bold',
  },
  indicadorFiltro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.fundoSecundario,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoIndicador: {
    fontSize: 14,
    color: cores.accentSecundario,
    fontWeight: '500',
  },
  botaoLimpar: {
    backgroundColor: cores.erro,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoLimpar: {
    color: cores.texto,
    fontSize: 12,
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
  },
  lista: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  listaVazia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  textoListaVazia: {
    fontSize: 16,
    color: cores.textoSecundario,
    textAlign: 'center',
  },
  // Estilos do modal - Tema escuro
  modalOverlay: {
    flex: 1,
    backgroundColor: cores.overlay,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: cores.fundoSecundario,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: cores.borda,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
  },
  botaoFechar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: cores.fundoCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: cores.borda,
  },
  textoFechar: {
    fontSize: 16,
    color: cores.textoSecundario,
    fontWeight: 'bold',
  },
  modalLista: {
    flex: 1,
  },
  itemModal: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  textoItemModal: {
    fontSize: 16,
    color: cores.texto,
  },
});

export default TelaListarMangas;

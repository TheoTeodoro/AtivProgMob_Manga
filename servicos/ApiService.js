import mangas from '../dados/MangaData';

const mangaService = {
  // Função que já existe
  buscarMangas: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mangas);
      }, 500);
    });
  },

  buscarPorId: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // O método .find() procura no array pelo primeiro item que satisfaz a condição
        const mangaEncontrado = mangas.find(manga => manga.id === id);
        
        if (mangaEncontrado) {
          // Se encontrar, a Promise é resolvida com o objeto do mangá
          resolve(mangaEncontrado);
        } else {
          // Se não encontrar, a Promise é rejeitada com um erro
          reject(new Error(`Mangá com id ${id} não foi encontrado.`));
        }
      }, 300); // Simula um pequeno delay, como nas outras funções
    });
  },

  // Função que já existe
  obterGeneros: () => {
    const generosSet = new Set();
    mangas.forEach(manga => {
      const generosList = manga.genero.split(',').map(g => g.trim());
      generosList.forEach(genero => generosSet.add(genero));
    });
    return Array.from(generosSet).sort();
  },

  // Função que já existe
  obterAutores: () => {
    const autoresSet = new Set();
    mangas.forEach(manga => {
      autoresSet.add(manga.autor);
    });
    return Array.from(autoresSet).sort();
  },

  // Função que já existe
  filtrarPorGenero: (genero) => {
    return mangas.filter(manga => 
      manga.genero.toLowerCase().includes(genero.toLowerCase())
    );
  },

  // Função que já existe
  filtrarPorAutor: (autor) => {
    return mangas.filter(manga => 
      manga.autor.toLowerCase() === autor.toLowerCase()
    );
  }
};

export default mangaService;

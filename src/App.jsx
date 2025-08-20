import { useEffect, useState } from "react";
import CardImage from "./components/CardImage";
import SearchImage from "./components/SearchImage";

export default function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [imageSelected, setImageSelected] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const imageFetching = async () => {
      const response = await fetch(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=${search}&image_type=photo&pretty=true`
      );
      const data = await response.json();
      setImages(data.hits);
    };

    imageFetching();
  }, [search]);

  
  const handleDownload = async () => {
    if (imageSelected && imageSelected.largeImageURL) {
      try {
        // Crear un enlace de descarga con el objeto URL
        const response = await fetch(imageSelected.largeImageURL);
        const blob = await response.blob(); // Obtener el archivo en formato blob

        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob); // Crear URL del blob

        link.href = url;
        link.download = `${imageSelected.user}_image.jpg`; // Definir nombre de archivo
        document.body.appendChild(link);
        link.click(); // Disparar el clic para descargar
        document.body.removeChild(link); // Limpiar el enlace del DOM

        window.URL.revokeObjectURL(url); // Revocar el objeto URL para liberar memoria
      } catch (error) {
        console.error("Error en la descarga:", error);
      }
    }
  };

  return (
    <div className="app bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 py-4 text-white">
        <h1 className="cursor-pointer text-center text-3xl font-semibold">
          Galería de imágenes
        </h1>
      </header>
      <main className="flex flex-col items-center py-6">
        <SearchImage userSearch={(userSearch) => setSearch(userSearch)} />
        <section className="image-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
          {images.length > 0 ? (
            images.map((image) => (
              <CardImage
                key={image.id}
                image={image}
                onClick={() => {
                  setImageSelected(image);
                  setIsImageLoading(true);
                }}
              />
            ))
          ) : (
            <div className="w-full col-span-12">
              <p className="text-lg">No hay resultados para esta búsqueda</p>
            </div>
          )}
        </section>
      </main>
      {imageSelected && (
        <div
          onClick={() => setImageSelected(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 py-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-lg max-w-4xl overflow-hidden shadow-lg"
          >
            <button
              onClick={() => setImageSelected(null)}
              className="absolute top-2 right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-red-700 transition duration-300"
            >
              X
            </button>

            <div className="relative w-full h-72 sm:h-96 bg-gray-200">
              <div
                className={`w-full h-full bg-gray-300 flex items-center justify-center ${isImageLoading ? "" : "hidden"}`}
              >
                <p className="text-white">Cargando...</p>
              </div>

              <div
                className={`w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out ${!isImageLoading ? "block" : "hidden"}`}
                style={{ backgroundImage: !isImageLoading ? `url(${imageSelected.largeImageURL})` : "none" }}
              >
                <img
                  className="hidden"
                  src={imageSelected.largeImageURL}
                  alt="Imagen seleccionada"
                  onLoad={() => setIsImageLoading(false)}
                  onError={(e) => {
                    e.target.style.display = "none";
                    setIsImageLoading(false);
                  }}
                />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:space-x-6 sm:items-center">
                <p className="text-lg font-semibold">
                  <strong>Por</strong> {imageSelected.user}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Descargas:</strong> {imageSelected.downloads}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Comentarios:</strong> {imageSelected.comments}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Me gusta:</strong> {imageSelected.likes}
                </p>
              </div>
              <div>
                <button
                  onClick={handleDownload}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Descargar imagen
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setImageSelected(null)}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

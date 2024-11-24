import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "IM9PyiUyG4A4X5NUzNYF2lJJB8LpxMavI4qo_nfpx4I";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });
        if (response.data.results.length === 0) {
          toast.error("Нічого не знайдено! Спробуйте інший запит.");
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
      } catch (err) {
        setError("Щось пішло не так, спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) {
      toast.error("Введіть інше ключове слово!");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={() => setPage(page + 1)} />}
      {showModal && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
}

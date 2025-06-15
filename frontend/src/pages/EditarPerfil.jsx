import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount, VscMail, VscCallIncoming } from "react-icons/vsc";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import ImagenPerfil from "../assets/images/perfilsf.jpg";

function EditarPerfil() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [face, setFace] = useState("");
  const [instagram, setInstagram] = useState("");
  const [cursos, setCursos] = useState([]);
  const [selectImage, setSelectImage] = useState(null);

  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectImage(reader.result); // esto será base64
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const cursosGuardados =
      JSON.parse(localStorage.getItem("listaCursos")) || [];

    if (userData) {
      setNombre(userData.nombre || "");
      setEmail(userData.email || "");
      setTelefono(userData.telefono || "");
      setFace(userData.face || "");
      setInstagram(userData.instagram || "");
      setSelectImage(userData.imagen || null);
    }

    setCursos(cursosGuardados);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const edicionUsuario = {
      nombre,
      email,
      telefono,
      face,
      instagram,
      cursos,
      imagen: selectImage,
    };

    localStorage.setItem("user", JSON.stringify(edicionUsuario));
    setMensajeConfirmacion("✅ Perfil actualizado correctamente.");

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => setMensajeConfirmacion(""), 3000);
    // navigate("/perfil/editar");
  };

  return (
    <div className="flex justify-center items-center min-h-dvh bg-azul-claro px-4">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <img
            src={selectImage || ImagenPerfil}
            alt="foto de perfil"
            className="w-80 h40 object-cover rounded-full border-4 border-white shadow-lg"
          />
          {/* MENSAJE DE CONFIRMACIÓN */}
          {mensajeConfirmacion && (
            <div className="mb-4 text-green-600 font-semibold text-center w-full">
              {mensajeConfirmacion}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-1/2 bg-yellow-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Subir Foto
          </button>
        </div>
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            EDITAR PERFIL
          </h2>

          <div className="flex items-center mb-3 border rounded bg-gray-100 p-2">
            <VscAccount className="text-gray-500 mr-2" size={30} />
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              readOnly
              className="w-full mb-3 p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center mb-3 border rounded bg-gray-100 p-2">
            <VscMail className="text-gray-500 mr-2" size={30} />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              readOnly
              className="w-full mb-3 p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center mb-3 border rounded bg-gray-100 p-2">
            <VscCallIncoming className="text-gray-500 mr-2" size={30} />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-3 border rounded bg-gray-100 p-2">
            <FaFacebook className="text-gray-500 mr-2" size={30} />
            <input
              type="text"
              placeholder="Facebook"
              value={face}
              onChange={(e) => setFace(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
          </div>

          <div className="flex items-center mb-3 border rounded bg-gray-100 p-2">
            <FaInstagram className="text-gray-500 mr-2" size={30} />
            <input
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
          </div>

          {/* Mostrar cursos (no editables) */}
          <label className="text-sm font-semibold mb-1 block">
            Cursos inscritos:
          </label>
          <ul className="list-disc list-inside mb-4 bg-gray-100 p-3 rounded">
            {cursos.length > 0 ? (
              cursos.map((curso, index) => (
                <li key={index} className="text-gray-700">
                  {curso}
                </li>
              ))
            ) : (
              <li className="italic text-gray-500">
                No hay cursos registrados.
              </li>
            )}
          </ul>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarPerfil;

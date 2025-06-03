import { ArrowLeft, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCharacter } from '../context/CharacterContext';
import { Comment } from '../types/coment';

export default function CharacterDetail() {
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  // Estado local para manejar los comentarios de múltiples personajes
  const [commentsByCharacter, setCommentsByCharacter] = useState<{
    [characterId: string]: Comment[];
  }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  // Función para agregar un nuevo comentario
  const handleAddComment = () => {
  
    if (!selectedCharacter || !newComment.trim() || !author.trim()) return;
    console.log("");
    const characterId = selectedCharacter.id;
    const newCommentObject: Comment = {
      id: (commentsByCharacter[characterId]?.length || 0) + 1,
      text: newComment,
      author,
    };

    setCommentsByCharacter((prev) => ({
      ...prev,
      [characterId]: [...(prev[characterId] || []), newCommentObject],
    }));

    setNewComment('');
    setAuthor('');
  };

  if (!selectedCharacter) return null; // Esto es crucial: CharacterDetail no renderiza nada si no hay personaje

  const characterComments =
    commentsByCharacter[selectedCharacter.id] || [];

  return (
    // ESTAS SON LAS CLASES CLAVE QUE YA TIENES
    <div className="fixed inset-0 bg-white lg:static lg:bg-transparent z-40"> 
      <div className="p-4 lg:p-6">
        <button
          onClick={() => setSelectedCharacter(null)}
          className="p-2 -ml-2 lg:hidden" // ESTE BOTÓN SOLO SE MUESTRA EN MOBILE
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="mt-4 lg:mt-0">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{selectedCharacter.name}</h1>
            </div>
            <Heart className="w-8 h-8 text-purple-500" fill="currentColor" />
          </div>

          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-1">Specie</h2>
              <p className="text-gray-600">{selectedCharacter.species}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-1">Status</h2>
              <p className="text-gray-600">{selectedCharacter.status}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-1">Occupation</h2>
              <p className="text-gray-600">{selectedCharacter.occupation || 'Unknown'}</p>
            </div>
          </div>

          {/* Sección de comentarios */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {/* Lista de comentarios */}
            <div className="space-y-4">
              {characterComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border p-3 rounded-lg bg-gray-100"
                >
                  <p className="text-gray-800">
                    <span className="font-bold">{comment.author}</span>: {comment.text}
                  </p>
                </div>
              ))}
              {characterComments.length === 0 && (
                <p className="text-gray-500">No comments.</p>
              )}
            </div>

            {/* Formulario para agregar un nuevo comentario */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Your name"
                className="border p-2 rounded-lg w-full mb-2"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <textarea
                placeholder="Write a comment..."
                className="border p-2 rounded-lg w-full mb-2"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const TextEditor = ({ content, setContent }) => {
    return (
      <>
        <input
          value={content.title || ''}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          className="w-full p-2 border-2 border-black mb-3"
          placeholder="Заголовок"
        />
        <textarea
          value={content.text || ''}
          onChange={(e) => setContent({ ...content, text: e.target.value })}
          className="w-full p-2 border-2 border-black"
          rows="5"
          placeholder="Текст"
        />
      </>
    );
  };
  
  export default TextEditor;
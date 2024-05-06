import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditPostModal = ({ show, onHide, post, onSave }) => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // State to track if the existing post picture is marked for removal
  const [isPictureRemoved, setIsPictureRemoved] = useState(false);

  useEffect(() => {
    setText(post?.text || '');
    setSelectedFile(null);
    setIsPictureRemoved(false);
  }, [post, show]);

  const handleTextChange = (e) => setText(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsPictureRemoved(false); // Reset removal state when a new file is selected
    }
  };

  const handleSave = () => {
    onSave(post._id, text, selectedFile, isPictureRemoved);
    onHide();
  };

  const handleRemovePicture = () => {
    setSelectedFile(null);
    setIsPictureRemoved(true);
    onSave(post._id, text, null, true); 
    onHide();
};

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={3} value={text} onChange={handleTextChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          {post.imageUrl && !isPictureRemoved && (
            <Button variant="danger" onClick={handleRemovePicture} className="mt-2">Remove Picture</Button>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;

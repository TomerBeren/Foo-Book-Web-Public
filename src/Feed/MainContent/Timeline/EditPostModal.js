import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditPostModal = ({ show, onHide, post, onSave }) => {
  const [text, setText] = useState("");

  // Removed imageUrl state and useEffect for previewUrl

  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave(post.id, text, selectedFile);
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
            {/* Removed image preview */}
          </Form.Group>
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
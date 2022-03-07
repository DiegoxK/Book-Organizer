/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Input, Space, Select, Table } from 'antd';
import { useState } from 'react';
import AddAutor from '../Modal/AddAutor';
import AddEditorial from '../Modal/AddEditorial';

import AddTopic from '../Modal/AddTopic';
import DraggableModal from '../Modal/DraggableModal';

import { columns as BookColumns } from './InsertBooksTable.json';

const { Option } = Select;

interface Libro {
  LibroId: number;
  Titulo: string;
  Autor: string;
  Editorial: string;
  Tema: string;
  Estado: number;
}

interface Tema {
  TemaId: number;
  Tema: string;
}

interface Autor {
  AutorId: number;
  Nombre: string;
  Apellido: string;
}

interface Editorial {
  EditorialId: number;
  Nombre: string;
}

function BookGestion() {
  const [books, setBooks] = useState<Libro[]>(
    window.electron.apiCalls.apiGetLibros()
  );

  const [temas, setTemas] = useState<Tema[]>(
    window.electron.apiCalls.apiGetTemas()
  );
  const [editoriales, setEditoriales] = useState<Editorial[]>(
    window.electron.apiCalls.apiGetEditoriales()
  );
  const [autores, setAutores] = useState<Autor[]>(
    window.electron.apiCalls.apiGetAutores()
  );

  const [bookForm, setBookForm] = useState({
    Titulo: '',
    TemaId: '',
    EditorialId: '',
    AutorId: '',
  });

  const [book, setBook] = useState({
    Titulo: '',
    TemaId: '',
    EditorialId: '',
    AutorId: '',
  });

  const onSubmit = (event: any) => {
    setBookForm({
      Titulo: '',
      TemaId: '',
      EditorialId: '',
      AutorId: '',
    });
    event.preventDefault();
    window.electron.apiCalls.apiInsertLibro(
      book.Titulo,
      book.TemaId,
      book.EditorialId,
      book.AutorId
    );
    setBooks(window.electron.apiCalls.apiGetLibros());
  };

  const onCancel = () => {
    setBookForm({
      Titulo: '',
      TemaId: '',
      EditorialId: '',
      AutorId: '',
    });
  };

  const onChange = (event: any) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
    setBookForm({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (value: string, event: any) => {
    setBook({
      ...book,
      [event.name]: event.key,
    });
    setBookForm({
      ...bookForm,
      [event.name]: value,
    });
  };

  return (
    <>
      <Space direction="vertical" size={20}>
        <Space>
          <Input
            value={bookForm.Titulo}
            addonBefore={<p>Titulo</p>}
            onChange={onChange}
            name="Titulo"
            style={{ width: 700 }}
            placeholder="Titulo del libro"
          />
        </Space>
        <Space>
          {/* ================================================================ */}
          <p>Tema</p>
          <Select
            style={{ width: 250 }}
            value={bookForm.TemaId}
            onChange={handleSelectChange}
          >
            {temas.map((tema) => {
              return (
                <Option key={tema.TemaId} value={tema.Tema} name="TemaId">
                  {tema.Tema}
                </Option>
              );
            })}
          </Select>
          <DraggableModal
            ModalComponent={AddTopic}
            title="Agregar Temas"
            data={temas}
            setData={setTemas}
          />
          {/* ================================================================ */}
          {/* ================================================================ */}
          <p>Editorial</p>
          <Select
            // arrow="true"
            style={{ width: 250 }}
            value={bookForm.EditorialId}
            placeholder="Editorial"
            onChange={handleSelectChange}
          >
            {editoriales.map((editorial) => {
              return (
                <Option key={editorial.EditorialId} name="EditorialId">
                  {editorial.Nombre}
                </Option>
              );
            })}
          </Select>
          <DraggableModal
            ModalComponent={AddEditorial}
            title="Agregar Editorial"
            data={editoriales}
            setData={setEditoriales}
          />
          {/* ================================================================ */}
        </Space>
        <Space>
          {/* ================================================================ */}
          <p>Autores</p>
          <Select
            // arrow="true"
            value={bookForm.AutorId}
            style={{ width: 250 }}
            placeholder="Autor"
            onChange={handleSelectChange}
          >
            {autores.map((autor) => {
              return (
                <Option key={autor.AutorId} name="AutorId">
                  {`${autor.Nombre} ${autor.Apellido}`}
                </Option>
              );
            })}
          </Select>
          <DraggableModal
            ModalComponent={AddAutor}
            title="Agregar Autor"
            data={autores}
            setData={setAutores}
          />
          <div className="button-margin">
            <Button onClick={onSubmit} type="primary">
              Ingresar Libro
            </Button>
            <Button onClick={onCancel} className="button-margin" danger>
              Cancelar
            </Button>
          </div>
          {/* ================================================================ */}
        </Space>
        <Table
          pagination={false}
          size="small"
          scroll={{ y: 230 }}
          style={{ width: 'auto' }}
          rowKey="LibroId"
          bordered
          columns={BookColumns}
          dataSource={books}
        />
      </Space>
    </>
  );
}

export default BookGestion;

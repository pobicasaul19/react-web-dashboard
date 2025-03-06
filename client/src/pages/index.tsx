import { Button, Card, CardActionArea, Typography } from '@mui/material';
import { useAuth } from '../feature/AuthContext';
import { useState } from "react";
import FormModal from "../components/FormModal";

export function HomePage() {
  const { logout } = useAuth();
  const userInfo = localStorage.getItem('auth');
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const { firstName, lastName, type } = parsedUserInfo.user;


  const [showModal, setShowModal] = useState(false);
  const [formData,] = useState({
    title: "",
    description: "",
    date: null,
    category: "",
  });
  const [errorData,] = useState({});
  const [uuid,] = useState("");

  const itemFields = [
    { type: "input" as const, label: "Title", model: "title" },
    { type: "textarea" as const, label: "Description", model: "description" },
    { type: "calendar" as const, label: "Date", model: "date" },
    {
      type: "select" as const,
      label: "Category",
      model: "category",
      options: [
        { name: "Category 1", value: "cat1" },
        { name: "Category 2", value: "cat2" }
      ]
    }
  ]

  const handleCreate = async (payload: Record<string, string | File | null>) => {
    console.log("Creating with payload:", payload);
    // API call logic here
  };

  const handleUpdate = async (payload: Record<string, string | File | null>, uuid: string) => {
    console.log("Updating with payload:", payload, "UUID:", uuid);
    // API call logic here
  };

  const onGetData = () => {
    console.log("Fetching data...");
    // Logic to fetch data after modal action
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen w-screen space-y-5'>
        <Card sx={{ minWidth: 345 }} className='text-center px-4 py-2'>
          <CardActionArea className='capitalize'>
            <Typography>Name: {`${firstName} ${lastName}`}</Typography>
            <Typography>Role: {type}</Typography>
          </CardActionArea>
        </Card>
        <div className='flex w-64 justify-between'>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
          <Button variant="contained" onClick={() => setShowModal(true)}>
            Open
          </Button>
        </div>
      </div>
      {showModal && (
        <FormModal
          showModal={showModal}
          header="Create or Edit Item"
          onGetData={onGetData}
          formData={formData}
          errorData={errorData}
          itemFields={itemFields}
          mode={uuid ? 'update' : 'create'}
          create={handleCreate}
          update={handleUpdate}
          uuid={uuid}
          name="Item"
          isPublish
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

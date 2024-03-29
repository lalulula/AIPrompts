"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const MyProfile = () => {
  const { data: session } = useSession();
  const [myPrompts, setMyPrompts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setMyPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, [session?.user.id]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPrompts = myPrompts.filter(
          (item) => item._id !== prompt._id
        );
        setMyPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPrompts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;

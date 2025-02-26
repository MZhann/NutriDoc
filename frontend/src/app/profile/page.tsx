"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile, updateUserProfile } from "@/api/user";
import { UpdateUserProfilePayload } from "@/types/userTypes";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Profile = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [refetch, setRefetch] = useState<boolean>(false);
  //user's data
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogFirstName, setDialogFirstName] = useState<string>("");
  const [dialogLastName, setDialogLastName] = useState<string>("");
  const [dialogEmail, setDialogEmail] = useState<string>("");
  const [dialogWeight, setDialogWeight] = useState<number>(0);
  const [dialogHeight, setDialogHeight] = useState<number>(0);
  const [dialogAge, setDialogAge] = useState<number>(0);
  const [dialogPassword, setDialogPassword] = useState<string>("");

  useEffect(() => {
    console.log('user id is:', id)  //just so wont be build bag
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUserProfile();
        // Сохраняем данные в стейт:
        setId(data.id);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setWeight(data.physical_data.weight);
        setHeight(data.physical_data.height);
        setAge(data.physical_data.age);
      } catch (error) {
        console.error("Fetching profile failed", error);
      }
    };

    fetchProfile();
  }, [refetch]);

  const handleOpenDialog = () => {
    setDialogFirstName(firstName);
    setDialogLastName(lastName);
    setDialogEmail(email);
    setDialogWeight(weight);
    setDialogHeight(height);
    setDialogAge(age);
    // password не храним в основном стейте, поэтому оставим пустым или любым значением
    setDialogPassword("");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // For Checking if the  form is valid (all required fields are filled)
  const isFormValid =
    dialogFirstName.trim() !== "" &&
    dialogLastName.trim() !== "" &&
    dialogEmail.trim() !== "" &&
    dialogWeight > 0 &&
    dialogHeight > 0 &&
    dialogAge > 0 &&
    dialogPassword.trim() !== "";

  // Отправляем PATCH запрос и обновляем основной стейт
  const handleSaveChanges = async () => {

    // Просто проверка на заполненность всех полей
    if (!isFormValid) {
      toast({
        title: "Warning",
        description: "Please fill all fields before saving",
        variant: "inform",
      });
      return;
    } 

    try {
      const payload: UpdateUserProfilePayload = {
        first_name: dialogFirstName,
        last_name: dialogLastName,
        email: dialogEmail,
        password: dialogPassword, // Передаём, если хотите менять пароль
        physical_data: {
          weight: dialogWeight,
          height: dialogHeight,
          age: dialogAge,
          blood_sugar: 0, // Если нужно, укажите свои значения
          BMI: 0, // Или вычислите
        },
      };

      // Делаем PATCH запрос к вашему эндпоинту
      const updatedData = await updateUserProfile(payload);

      toast({
        title: "Successfully updated",
        description: "Profile info is updated",
        variant: "success",
      });
      setRefetch(!refetch);

      // Обновляем локальный стейт по факту сохранения
      setFirstName(updatedData.first_name);
      setLastName(updatedData.last_name);
      setEmail(updatedData.email);
      // В ответе нет физ. параметров (возвращается лишь physical_data_id).
      // Если бекенд придаст вам обновлённые weight, height, age — обновите их аналогично.

      // Закрываем диалог
      setIsDialogOpen(false);
    } catch (error) {
      console.error("User profile update failed", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/greating");
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center pt-20 text-[#3F414E] p-6">
      <div className="flex w-full items-center justify-center">
        <h1 className="font-bold text-2xl">Profile</h1>
        <Button
          onClick={() => handleLogOut()}
          variant={"none"}
          className="absolute right-0 text-[#A0A3B1]"
        >
          log out
        </Button>
      </div>
      <div className="mt-2">
        <Image
          src="/assets/images/decoration/avatar.png"
          width={80}
          height={80}
          className="rounded-full"
          alt="avatar"
        />
      </div>
      <div className="flex flex-col items-center mt-4 font-bold text-[#A0A3B1] ">
        <p>
          {firstName} {lastName}, {age} yo
        </p>
        <p>{email}</p>
        <Button
          variant={"none"}
          className="underline font-bold -mt-1 text-myindigo"
          onClick={handleOpenDialog}
        >
          edit
        </Button>
      </div>

      <div className="flex w-full justify-between text-[#A0A3B1]">
        <div>Weight: {weight}kg</div>
        <div>Sessions: 25</div>
      </div>

      <div className="flex w-full justify-between text-[#A0A3B1]">
        <div>Height: {height}cm</div>
        <div>Completed Sessions: 15</div>
      </div>

      <div className="w-full mt-10 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>GOAL: 58 kg</span>
            <span>APR 30</span>
          </div>
        </div>
        <div className="text-lg font-bold text-[#5A6175]">In progress</div>
      </div>

      <div className="w-full mt-4 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>GOAL: 58 kg</span>
            <span>APR 30</span>
          </div>
        </div>
        <div className="text-lg font-bold text-[#5A6175]">In progress</div>
      </div>

      <div className="w-full mt-4 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6  ">
        <div>
          <p className="text-lg font-bold">Lose weight</p>
          <div className="flex flex-col text-sm text-[#5A6175]">
            <span>GOAL: 58 kg</span>
            <span>APR 30</span>
          </div>
        </div>
        <div className="text-lg font-bold text-[#5A6175]">In progress</div>
      </div>

      {/* Диалоговое окно для редактирования */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Можно использовать DialogTrigger, но мы открываем по onClick, поэтому не дублируем его здесь */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-myindigo font-bold">Edit your data</DialogTitle>
            <DialogDescription>
              Update any field you wish to change.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogFirstName">First Name</Label>
              <Input
                id="dialogFirstName"
                value={dialogFirstName}
                onChange={(e) => setDialogFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogLastName">Last Name</Label>
              <Input
                id="dialogLastName"
                value={dialogLastName}
                onChange={(e) => setDialogLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogEmail">Email</Label>
              <Input
                id="dialogEmail"
                type="email"
                value={dialogEmail}
                onChange={(e) => setDialogEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogWeight">Weight</Label>
              <Input
                id="dialogWeight"
                type="number"
                value={dialogWeight}
                onChange={(e) => setDialogWeight(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogHeight">Height</Label>
              <Input
                id="dialogHeight"
                type="number"
                value={dialogHeight}
                onChange={(e) => setDialogHeight(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogAge">Age</Label>
              <Input
                id="dialogAge"
                type="number"
                value={dialogAge}
                onChange={(e) => setDialogAge(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="dialogPassword">Password</Label>
              <Input
                id="dialogPassword"
                type="password"
                value={dialogPassword}
                onChange={(e) => setDialogPassword(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant={"indigo"} onClick={handleSaveChanges}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Profile;

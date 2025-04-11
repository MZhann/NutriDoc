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
import Skeleton from "@/components/ui/skeleton";
import { Loader, LogOut } from "lucide-react";

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
  const [bloodSugar, setBloodSugar] = useState<number>(0);
  const [age, setAge] = useState<number>(0);

  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [activeSessions, setActiveSessions] = useState<number>(0);
  const [completedSessions, setCompletedSessions] = useState<number>(0);

  const [loadingProfileData, setLoadingProfileData] = useState<boolean>(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dialogFirstName, setDialogFirstName] = useState<string>("");
  const [dialogLastName, setDialogLastName] = useState<string>("");
  const [dialogEmail, setDialogEmail] = useState<string>("");
  const [dialogWeight, setDialogWeight] = useState<number>(0);
  const [dialogHeight, setDialogHeight] = useState<number>(0);
  const [dialogAge, setDialogAge] = useState<number>(0);
  const [dialogBloodSugar, setDialogBloodSugar] = useState<number>(0);
  const [dialogPassword, setDialogPassword] = useState<string>("");

  const [isUpdatingProfileData, setIsUpdatingProfileData] =
    useState<boolean>(false);

  useEffect(() => {
    console.log("user id is:", id); //just so wont be build bag
    const fetchProfile = async () => {
      setLoadingProfileData(true);
      try {
        const data = await getCurrentUserProfile();
        // Сохраняем данные в стейт:
        setId(data.id);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setWeight(data.physical_data.weight);
        setHeight(data.physical_data.height);
        setBloodSugar(data.physical_data.blood_sugar);
        setActiveSessions(data.statistics.active_sessions);
        setTotalSessions(data.statistics.total_sessions);
        setCompletedSessions(data.statistics.completed_sessions);
        setAge(data.physical_data.age);
      } catch (error) {
        console.error("Fetching profile failed", error);
      } finally {
        setLoadingProfileData(false);
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
    setDialogBloodSugar(bloodSugar);
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
    dialogBloodSugar > 0 &&
    dialogPassword.trim() !== "";

  // Отправляем PATCH запрос и обновляем основной стейт
  const handleSaveChanges = async () => {
    setIsUpdatingProfileData(true);
    // Просто проверка на заполненность всех полей
    if (!isFormValid) {
      toast({
        title: "Warning",
        description: "Please fill all fields before saving",
        variant: "inform",
      });
      setIsUpdatingProfileData(false);
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
          blood_sugar: dialogBloodSugar, // Если нужно, укажите свои значения
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
    } finally {
      setIsUpdatingProfileData(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/greating");
  };

  return (
    <section className="w-full max-w-3xl min-h-screen mb-40 flex flex-col items-center pt-20 text-[#3F414E] p-6">
      <div className="flex w-full items-center justify-center">
        <h1 className="font-bold text-2xl">Profile</h1>
        <Button
          onClick={() => handleLogOut()}
          variant={"none"}
          className="absolute right-0 text-[#A0A3B1] hover:text-myindigo"
        >
          <LogOut className="mr-4 " />
          {/* log out */}
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
        {firstName && lastName && age ? (
          <p className="text-lg text-myindigo font-bold">
            {firstName} {lastName}, {age} yo
          </p>
        ) : (
          <Skeleton className="w-40 h-4 mt-1" />
        )}

        {email ? <p>{email}</p> : <Skeleton className="w-44 h-4 mt-3" />}

        <Button
          variant={"none"}
          className="underline font-bold -mt-1 text-myindigo"
          onClick={handleOpenDialog}
        >
          edit
        </Button>
      </div>

      <div className="flex w-full justify-between text-[#A0A3B1]">
        {weight ? (
          <div>
            Weight: <span className="text-myindigo font-bold">{weight} kg</span>
          </div>
        ) : (
          <Skeleton className="w-4/12 h-4" />
        )}
        {!loadingProfileData ? (
          <div>
            Sessions:{" "}
            <span className="text-myindigo font-bold">{totalSessions}</span>
          </div>
        ) : (
          <Skeleton className="w-3/12 h-4" />
        )}
      </div>

      <div className="flex w-full justify-between text-[#A0A3B1]">
        {height ? (
          <div>
            Height: <span className="text-myindigo font-bold">{height} cm</span>
          </div>
        ) : (
          <Skeleton className="w-3/12 h-4 mt-1" />
        )}

        {loadingProfileData ? (
          <Skeleton className="w-4/12 h-4 mt-1" />
        ) : (
          <div>
            Completed Sessions:{" "}
            <span className="text-myindigo font-bold">{completedSessions}</span>
          </div>
        )}
      </div>

      <div className="flex w-full justify-between text-[#A0A3B1]">
        {bloodSugar ? (
          <div>
            Blood sugar:{" "}
            <span className="text-myindigo font-bold">{bloodSugar} mg/dL</span>
          </div>
        ) : (
          <Skeleton className="w-4/12 h-4 mt-1" />
        )}

        {loadingProfileData ? (
          <Skeleton className="w-3/12 h-4 mt-1" />
        ) : (
          <div>
            Active Sessions:{" "}
            <span className="text-myindigo font-bold">{activeSessions}</span>
          </div>
        )}
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
            <DialogTitle className="text-myindigo font-bold">
              Edit your data
            </DialogTitle>
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
              <Label htmlFor="bloodSugar">Blood sugar</Label>
              <Input
                id="bloodSugar"
                type="number"
                value={dialogBloodSugar}
                onChange={(e) => setDialogBloodSugar(Number(e.target.value))}
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
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              variant={"indigo"}
              onClick={handleSaveChanges}
              disabled={isUpdatingProfileData}
            >
              {isUpdatingProfileData ? (
                <Loader className="animate-spin text-white" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Profile;

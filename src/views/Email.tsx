import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Profile } from "@assets/profile.svg";
import { ReactComponent as Logout } from "@assets/log-out.svg";
import { ReactComponent as Pen } from "@assets/pen.svg";
import Button from "@components/Button";
import Draft from "@components/Draft";
import { useCurrentUserQuery } from "@features/auth/auth-api";
import EmailsTable from "@components/EmailsTable";

const Email = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery({});
  const [isDraftVisible, setIsDraftVisible] = useState(false);

  const handleOpenDraft = () => {
    setIsDraftVisible(true);
  };

  const handleCloseDraft = () => {
    setIsDraftVisible(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userCredentials");
    navigate("/");
  };

  return (
    <>
      <div className="bg-[#f8f3fb] flex flex-col justify-center h-screen w-screen">
        <div className="flex flex-col gap-4 items-center mb-4">
          <div>
            <div className="flex items-center mb-1 gap-2">
              <Profile />
              <h2 className="font-semibold">{currentUser?.username}</h2>
            </div>
            <div className="font-semibold text-[#702424]">
              {currentUser?.email}
            </div>
          </div>
          <Button
            className="bg-[#f4fca3] hover:bg-[#eff882]"
            onClick={handleOpenDraft}
          >
            <Pen />
            Compose
          </Button>
          <Button
            onClick={handleLogOut}
            className="bg-[#E9C1C1] hover:bg-[#debebe]"
          >
            <Logout />
            Log out
          </Button>
        </div>
        <EmailsTable />
        {isDraftVisible && (
          <Draft userInfo={currentUser} onClose={handleCloseDraft} />
        )}
      </div>
    </>
  );
};

export default Email;

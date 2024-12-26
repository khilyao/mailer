import { createPortal } from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactComponent as Minimize } from "@assets/minimize.svg";
import { ReactComponent as Close } from "@assets/close.svg";
import Editor from "@components/Editor";
import { useSendEmailMutation } from "@features/email/email-api";

interface User {
  id: number;
  username: string;
  email?: string;
}

interface IDraftProps {
  userInfo: User | null;
  onClose: () => void;
}

export interface IDraftFormValues {
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}

const Draft = ({ userInfo, onClose }: IDraftProps) => {
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { id, username, email } = userInfo;

  const defaultValues = {
    sender: id,
  };

  const [sendEmail] = useSendEmailMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IDraftFormValues>({ defaultValues });

  const onSubmit: SubmitHandler<IDraftFormValues> = async (data) => {
    setValue("message", "");

    try {
      await sendEmail(data);
    } catch (e) {
      console.error(e);
    }

    onClose();
    reset();
  };

  return createPortal(
    <div className="fixed left-3 md:left-auto bottom-3 right-3 flex flex-col md:w-[440px] bg-white h-[420px] lg:h-[460px] lg:w-[530px]">
      <div className="flex justify-between px-4 bg-[#bed3e3] py-[10px]">
        <span className="text-sm  font-medium">New message</span>
        <div className="flex gap-2 items-center">
          <div className="flex items-center h-full cursor-pointer">
            <Minimize className="mt-[5px]" />
          </div>
          <div
            className="flex items-center h-full cursor-pointer"
            onClick={onClose}
          >
            <Close />
          </div>
        </div>
      </div>
      <form
        className="px-4 flex flex-col grow"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="py-[6px]">
          <span className="inline-block text-sm">
            {`${username} <${email}>`}
          </span>
        </div>
        <div className="flex border-black flex-col ">
          <input
            className="bg-white border-y text-sm py-2 focus:outline-none "
            id="recipient"
            placeholder="Recipient"
            {...register("recipient", {
              required: "Recipient is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid recipient's address",
              },
            })}
          />
          {errors.recipient && (
            <span className="text-red-600 text-[10px]">
              {errors.recipient.message}
            </span>
          )}
        </div>
        <div className="flex flex-col ">
          <input
            className="bg-white text-sm border-b py-2 focus:outline-none "
            id="subject"
            placeholder="Subject"
            {...register("subject", {
              required: "Subject is required",
            })}
          />
          {errors.subject && (
            <span className="text-red-600 text-[10px]">
              {errors.subject.message}
            </span>
          )}
        </div>
        <div className="flex flex-col grow  py-2">
          <Editor setValue={setValue} />
          {errors.message && (
            <span className="text-red-600 text-[10px]">
              {errors.message.message}
            </span>
          )}
        </div>
        <button className="ml-auto px-4 py-3 text-white font-medium rounded-lg transition-colors duration-200 bg-[#b13a3a] hover:bg-[#983a3a]">
          Send
        </button>
      </form>
    </div>,
    document.body
  );
};

export default Draft;

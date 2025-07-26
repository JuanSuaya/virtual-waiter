import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const DescriptionForm = ({ description, setDescription }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <div className="h-[300px] sm:h-[400px] rounded-lg border">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            className="h-[calc(100%-42px)]"
          />
        </div>
      </div>
    </div>
  );
};
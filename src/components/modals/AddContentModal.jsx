import React, { useState } from "react";
import { BookOpen, FileText, Video, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/formComponents/input";
import { Textarea } from "../ui/formComponents/textarea";
import { Checkbox } from "../ui/formComponents/checkbox";
import { Button } from "../ui/button";
import Select from "react-select";
import { Label } from "../ui/label";

const targetAudienceOptions = [
  { value: "parent", label: "Parents" },
  { value: "mentor", label: "Mentors" },
  { value: "school", label: "Schools" },
];

const AddContentModal = ({ isOpen, onClose }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    category: "literature",
    targetAudience: null,
    videoUrl: "",
    bookUrl: "",
    author: "",
    thumbnailUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare payload according to API structure
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        category: formData.category,
        targetAudience: formData.targetAudience?.value,
        author: formData.author,
        thumbnailUrl: formData.thumbnailUrl,
        // Include the appropriate URL based on content type
        ...(formData.type === "video"
          ? { videoUrl: formData.videoUrl }
          : { bookUrl: formData.bookUrl }),
      };

      const response = await fetch(`${apiURL}/content`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Reset form and close modal on success
        setFormData({
          title: "",
          description: "",
          type: "video",
          category: null,
          targetAudience: null,
          videoUrl: "",
          bookUrl: "",
          author: "",
          thumbnailUrl: "",
        });
        onClose();
        alert("Content Successfully created");
      } else {
        throw (
          (new Error("Failed to create content"),
          alert("Failed to create content"))
        );
      }
    } catch (error) {
      console.error("Error creating content:", error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-deep-navy">
            Add New Content
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: "video", icon: Video, label: "Video", color: "purple" },
                { type: "book", icon: FileText, label: "PDF", color: "yellow" },
              ].map((item) => {
                const isActive = formData.type === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    className={`flex flex-col items-center justify-center rounded h-auto py-6 border-2 transition-colors ${
                      isActive
                        ? `bg-${item.color}-50 border-${item.color}-200 text-${item.color}-700`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("type", item.type)}
                  >
                    <item.icon
                      className={`w-8 h-8 mb-2 ${
                        isActive ? `text-${item.color}-600` : `text-gray-400`
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter content title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                required
              />
            </div>

            <div className=" gap-4">
              {/* <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(option) => handleInputChange("category", option)}
                  placeholder="Select category"
                  isClearable
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select
                  options={targetAudienceOptions}
                  value={formData.targetAudience}
                  onChange={(option) =>
                    handleInputChange("targetAudience", option)
                  }
                  placeholder="Select target audience"
                  isClearable
                />
              </div>
            </div>

            {/* Content URL based on type */}
            <div className="space-y-2">
              <Label htmlFor="contentUrl">
                {formData.type === "video" ? "Video URL *" : "Book/PDF URL *"}
              </Label>
              <Input
                id="contentUrl"
                type="url"
                placeholder={
                  formData.type === "video"
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://example.com/document.pdf"
                }
                value={
                  formData.type === "video"
                    ? formData.videoUrl
                    : formData.bookUrl
                }
                onChange={(e) =>
                  handleInputChange(
                    formData.type === "video" ? "videoUrl" : "bookUrl",
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  handleInputChange("thumbnailUrl", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter content description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="publish"
                checked={isPublished}
                onCheckedChange={() => setIsPublished(!isPublished)}
              />
              <Label htmlFor="publish" className="text-sm font-normal">
                Publish immediately
              </Label>
            </div> */}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Content"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContentModal;

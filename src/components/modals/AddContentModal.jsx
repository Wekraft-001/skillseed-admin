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

const options = [
  { value: "education", label: "Education" },
  { value: "science", label: "Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "literature", label: "Literature" },
];
const AddContentModal = ({ isOpen, onClose }) => {
  const [contentType, setContentType] = useState("video");
  const [isPublished, setIsPublished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-deep-navy">
            Add New Content
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 ">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <div className="grid grid-cols-3 gap-4 ">
              {[
                { type: "video", icon: Video, label: "Video", color: "purple" },
                { type: "pdf", icon: FileText, label: "PDF", color: "yellow" },
                {
                  type: "article",
                  icon: BookOpen,
                  label: "Article",
                  color: "green",
                },
              ].map((item) => {
                const isActive = contentType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    variant={isActive ? "secondary" : "outline"}
                    className={`flex flex-col h-auto py-6 ${
                      isActive
                        ? `bg-${item.color}-50 border-${item.color}-200 text-${item.color}-700`
                        : ""
                    }`}
                    onClick={() => setContentType(item.type)}
                  >
                    <item.icon
                      className={`w-8 h-8 mb-2 ${
                        isActive
                          ? `text-${item.color}-600`
                          : `text-${item.color}-400`
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {contentType !== "article" ? (
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <div className="max-w-xs mx-auto">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {contentType === "video"
                    ? "Upload your video"
                    : "Upload your document"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <button type="button" variant="default" size="sm">
                  Select File
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  {contentType === "video"
                    ? "Supported formats: MP4, MOV, AVI (Max 500MB)"
                    : "Supported formats: PDF, DOCX, PPTX (Max 500MB)"}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="article-content">Article Content</label>
              <Textarea
                id="article-content"
                placeholder="Write your article content here..."
                className="min-h-[200px]"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input id="title" placeholder="Enter content title" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category">Category</label>
                <Select
                  options={options}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Select category"
                  isClearable
                />
              </div>
              {contentType !== "article" && (
                <div className="space-y-2">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <Input id="duration" type="number" placeholder="e.g. 15" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                placeholder="Enter content description"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="publish"
                checked={isPublished}
                onCheckedChange={() => setIsPublished(!isPublished)}
              />
              <label htmlFor="publish" className="text-sm font-normal">
                Publish immediately
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {contentType === "article" ? "Publish Article" : "Upload Content"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddContentModal;

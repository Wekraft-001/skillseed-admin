import React, { useState } from "react";
import {
  GraduationCap,
  Handshake,
  MapPin,
  Heart,
  Plus,
  X,
  BookOpen,
  Briefcase,
  Music,
  Camera,
  Gamepad2,
  Coffee,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Trash2,
  TrendingUp,
  Users,
  Calendar,
  Star,
} from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Learning & Development",
      icon: "GraduationCap",
      color: "blue",
      count: 145,
      description: "Educational content and skill development",
      dateCreated: "2024-01-15",
      status: "active",
      trending: true,
    },
    {
      id: 2,
      name: "Mentorship Programs",
      icon: "Handshake",
      color: "yellow",
      count: 67,
      description: "Guidance and coaching resources",
      dateCreated: "2024-02-20",
      status: "active",
      trending: false,
    },
    {
      id: 3,
      name: "Field Excursions",
      icon: "MapPin",
      color: "green",
      count: 34,
      description: "Outdoor activities and adventures",
      dateCreated: "2024-03-10",
      status: "active",
      trending: true,
    },
    {
      id: 4,
      name: "Parenting Support",
      icon: "Heart",
      color: "purple",
      count: 90,
      description: "Family and childcare guidance",
      dateCreated: "2024-01-30",
      status: "active",
      trending: false,
    },
    {
      id: 5,
      name: "Creative Arts",
      icon: "Camera",
      color: "pink",
      count: 23,
      description: "Photography and visual arts",
      dateCreated: "2024-04-05",
      status: "active",
      trending: false,
    },
  ]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("BookOpen");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const iconOptions = [
    { name: "BookOpen", component: BookOpen },
    { name: "GraduationCap", component: GraduationCap },
    { name: "Briefcase", component: Briefcase },
    { name: "Heart", component: Heart },
    { name: "Music", component: Music },
    { name: "Camera", component: Camera },
    { name: "Gamepad2", component: Gamepad2 },
    { name: "Coffee", component: Coffee },
    { name: "Handshake", component: Handshake },
    { name: "MapPin", component: MapPin },
  ];

  const colorOptions = [
    {
      name: "blue",
      bg: "bg-blue-500",
      bgLight: "bg-blue-500/5",
      bgIcon: "bg-blue-500/10",
      text: "text-blue-500",
    },
    {
      name: "yellow",
      bg: "bg-yellow-500",
      bgLight: "bg-yellow-500/5",
      bgIcon: "bg-yellow-500/10",
      text: "text-yellow-600",
    },
    {
      name: "green",
      bg: "bg-green-500",
      bgLight: "bg-green-500/5",
      bgIcon: "bg-green-500/10",
      text: "text-green-500",
    },
    {
      name: "purple",
      bg: "bg-purple-500",
      bgLight: "bg-purple-500/5",
      bgIcon: "bg-purple-500/10",
      text: "text-purple-500",
    },
    {
      name: "red",
      bg: "bg-red-500",
      bgLight: "bg-red-500/5",
      bgIcon: "bg-red-500/10",
      text: "text-red-500",
    },
    {
      name: "orange",
      bg: "bg-orange-500",
      bgLight: "bg-orange-500/5",
      bgIcon: "bg-orange-500/10",
      text: "text-orange-500",
    },
    {
      name: "pink",
      bg: "bg-pink-500",
      bgLight: "bg-pink-500/5",
      bgIcon: "bg-pink-500/10",
      text: "text-pink-500",
    },
    {
      name: "indigo",
      bg: "bg-indigo-500",
      bgLight: "bg-indigo-500/5",
      bgIcon: "bg-indigo-500/10",
      text: "text-indigo-500",
    },
  ];

  const getColorClasses = (colorName) => {
    const color = colorOptions.find((c) => c.name === colorName);
    return color || colorOptions[0];
  };

  const getIcon = (iconName) => {
    const icon = iconOptions.find((i) => i.name === iconName);
    return icon ? icon.component : BookOpen;
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim() || "No description provided",
        icon: selectedIcon,
        color: selectedColor,
        count: 0,
        dateCreated: new Date().toISOString().split("T")[0],
        status: "active",
        trending: false,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setSelectedIcon("BookOpen");
      setSelectedColor("blue");
      setIsCategoryModalOpen(false);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  const incrementCount = (categoryId) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, count: cat.count + 1 } : cat
      )
    );
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || category.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalItems = categories.reduce((sum, cat) => sum + cat.count, 0);
  const activeCategories = categories.filter(
    (cat) => cat.status === "active"
  ).length;
  const trendingCategories = categories.filter((cat) => cat.trending).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Categories
              </h1>
              <p className="text-gray-600 text-lg">
                Organize and manage your application's categories efficiently
              </p>
            </div>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              //   className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              className="flex items-center bg-[#FFC107] text-[#0F1419] px-6 py-3 rounded-full font-semibold hover:bg-[#FFC107]/90 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add New Category
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {categories.length}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Active Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeCategories}
                  </p>
                </div>
              </div>
            </div> */}

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">Trending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {trendingCategories}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalItems}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="w-full p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Categories Overview
              </h2>
              <p className="text-gray-600 mt-1">
                Manage and organize your content categories
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Items
                  </th>
                  {/* <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Status
                  </th> */}
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Created
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-gray-100 p-4 rounded-full">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg">No categories found</p>
                        <p className="text-sm">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => {
                    const IconComponent = getIcon(category.icon);
                    const colorClasses = getColorClasses(category.color);

                    return (
                      <tr
                        key={category.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div
                              className={`${colorClasses.bgIcon} p-3 rounded-xl`}
                            >
                              <IconComponent
                                className={`${colorClasses.text} w-5 h-5`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {category.name}
                                </span>
                                {category.trending && (
                                  <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Trending
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-600 max-w-xs">
                            {category.description}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => incrementCount(category.id)}
                            className={`${colorClasses.bg} hover:opacity-80 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md`}
                          >
                            {category.count}
                          </button>
                        </td>
                        {/* <td className="py-4 px-6 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              category.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {category.status}
                          </span>
                        </td> */}
                        <td className="py-4 px-6 text-center text-gray-600 text-sm">
                          {new Date(category.dateCreated).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {filteredCategories.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredCategories.length} of {categories.length}{" "}
                categories
              </p>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h4 className="text-2xl font-bold text-gray-900">
                  Create New Category
                </h4>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Category Name and Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g., Digital Marketing"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newCategoryDescription}
                      onChange={(e) =>
                        setNewCategoryDescription(e.target.value)
                      }
                      placeholder="Brief description of the category"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {iconOptions.map((icon) => {
                      const IconComp = icon.component;
                      return (
                        <button
                          key={icon.name}
                          onClick={() => setSelectedIcon(icon.name)}
                          className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                            selectedIcon === icon.name
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <IconComp className="w-6 h-6 text-gray-600 mx-auto" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose Color Theme
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-full h-12 rounded-xl ${
                          color.bg
                        } border-2 transition-all transform hover:scale-105 ${
                          selectedColor === color.name
                            ? "border-gray-800 ring-2 ring-gray-300"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Preview
                  </label>
                  <div
                    className={`flex items-center gap-4 p-4 ${
                      getColorClasses(selectedColor).bgLight
                    } rounded-xl border border-gray-200`}
                  >
                    <div
                      className={`${
                        getColorClasses(selectedColor).bgIcon
                      } p-3 rounded-xl`}
                    >
                      {React.createElement(getIcon(selectedIcon), {
                        className: `${
                          getColorClasses(selectedColor).text
                        } w-6 h-6`,
                      })}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">
                        {newCategoryName || "Category Name"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {newCategoryDescription || "Category description"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition font-semibold shadow-lg"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  //   function getColorClasses(colorName) {
  //     const color = colorOptions.find((c) => c.name === colorName);
  //     return color || colorOptions[0];
  //   }

  //   function getIcon(iconName) {
  //     const icon = iconOptions.find((i) => i.name === iconName);
  //     return icon ? icon.component : BookOpen;
  //   }
};

export default Categories;

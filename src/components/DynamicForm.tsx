"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import PropertyInput from "./PropertyInput";
import SubmittedDataTable from "./SubmittedDataTable";
import {API_BASE_URL} from "../utils/api"

const headers = {
  'Cache-Control': 'no-cache',
  'User-Agent': 'PostmanRuntime/7.43.2',
  'Accept': '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'content-language': 'en',
  'locale': 'en',
  'platform': 'web',
  'private-key': 'Tg$LXgp7uK!D@aAj^aT3TmWY9a9u#qh5g&xgEETJ',
};

const DynamicForm = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [subcategories, setSubcategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [properties, setProperties] = useState<{ id: number; name: string; type: string; options: { id: number; name: string }[] }[]>([]);
  const [formValues, setFormValues] = useState<{ [key: number]: string }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: number]: string } | null>(null);

  useEffect(() => {
    axios.get("https://stagingapi.mazaady.com/api/v1/all-categories/web", { headers })
      .then(response => setCategories(response.data.data.categories.filter((cat: any) => cat.parent_id === null)))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    axios.get("https://stagingapi.mazaady.com/api/v1/all-categories/web", { headers })
      .then(response => setSubcategories(response.data.data.categories.filter((cat: any) => cat.parent_id === categoryId)))
      .catch(error => console.error("Error fetching subcategories:", error));
    setSelectedSubcategory(null);
    setProperties([]);
  };

  const handleSubcategoryChange = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    axios.get(`https://stagingapi.mazaady.com/api/v1/properties/${subcategoryId}`, { headers })
      .then(response => setProperties(response.data.data))
      .catch(error => console.error("Error fetching properties:", error));
  };

  const handleInputChange = (propertyId: number, value: string) => {
    setFormValues(prev => ({ ...prev, [propertyId]: value }));
  };

  const handleSubmit = () => {
    setSubmittedData(formValues);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Dynamic Form</h2>

      <Dropdown label="Main Category" options={categories} value={selectedCategory} onChange={handleCategoryChange} />
      {subcategories.length > 0 && (
        <Dropdown label="Subcategory" options={subcategories} value={selectedSubcategory} onChange={handleSubcategoryChange} />
      )}

      {properties.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Properties</h3>
          {properties.map((prop) => (
            <PropertyInput key={prop.id} property={prop} value={formValues[prop.id]} onChange={handleInputChange} />
          ))}
        </div>
      )}

      <button 
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {submittedData && <SubmittedDataTable submittedData={submittedData} properties={properties} />}
    </div>
  );
};

export default DynamicForm;

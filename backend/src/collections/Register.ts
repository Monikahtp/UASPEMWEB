import { CollectionConfig } from "payload/types";

const Register: CollectionConfig = {
  slug: "register",
  auth: true,
  admin: {
    useAsTitle: "name", // Sesuaikan dengan field yang cocok menjadi judul
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email", required: true, unique: true },
    { name: "asal_sekolah", type: "text", label: "Asal Sekolah" },
    { 
      name: "status",
      type: "select",
      options: ["waiting", "accepted", "rejected"],
      defaultValue: "waiting",
      label: "Status",
    },
    { name: "tanggal_pendaftaran", type: "date", label: "Tanggal Pendaftaran" },
  ],
};

export default Register;

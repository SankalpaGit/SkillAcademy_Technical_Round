
import {
  Mail,
  User,
  Calendar,
  Pencil,
  Lock,
} from "lucide-react";

const Profile = () => {
  const user = {
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    date_joined: "2023-04-15T10:20:00Z",
    bio: "Frontend Developer. Lover of coffee, code, and clean UI.",
    avatar: "https://i.pravatar.cc/150?img=47",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow">
        {/* Avatar + Buttons */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300"
          />
          <div className="flex flex-col gap-2 w-full">
            <button className="flex items-center justify-center gap-2 bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 transition">
              <Pencil size={16} />
              Edit Profile
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition">
              <Lock size={16} />
              Change Password
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <div className="space-y-4">
            
            <div className="flex items-center gap-3 text-gray-800">
              <User size={18} className="text-indigo-600" />
              <span className="font-medium">Full Name:</span>
              <span>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <Mail size={18} className="text-indigo-600" />
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-800">
              <Calendar size={18} className="text-indigo-600" />
              <span className="font-medium">Joined:</span>
              <span>{new Date(user.date_joined).toLocaleString()}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-800">
              <span className="text-indigo-600 font-semibold">Bio:</span>
              <span>{user.bio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

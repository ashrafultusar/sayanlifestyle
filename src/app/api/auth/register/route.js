import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose"; 

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password"); // Don't return passwords

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch Users Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { email } = await req.json(); 
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Delete User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
   

    await connectDB();

    const body = await request.json();
 

    const { id, role } = body;

    // Validate role
    const allowedRoles = ["admin", "superadmin"];
    if (!allowedRoles.includes(role)) {
      console.log("Invalid role:", role);
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user ID:", id);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      console.log("User not found for ID:", id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.role = role;
    await user.save();

    console.log("Role updated for user:", user);
    return NextResponse.json({ message: "Role updated", user }, { status: 200 });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

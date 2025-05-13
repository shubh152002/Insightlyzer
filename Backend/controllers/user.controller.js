import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
 

  try {
     const { fullname, email, password, role } = req.body;
    // Check if all fields are present
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({ message: 'Please fill all the fields',success: false });
    }

    // Check if user already exists
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists',success: false });

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
     await User.create({ fullname, email, password: hashed, role });

    res.status(201).json({ message: 'User registered successfully',success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error',success: false}); // ✅ fixed typo here
  }
};

export const login = async (req, res) => {

    try {

        // Check if all fields are present
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res
            .status(400)
            .json({ message: "Please fill all the fields", success: false });
        }
        // Find user
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials',success: false });
        
        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials',success: false });
        
        // Check if role matches
        if (user.role !== role){
            return res.status(403).json({ message: 'Forbidden: Role does not match',success: false });
        }
        
        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
        };
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            //   secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        }).status(200).json({
            message: "Login successful",
            user,
            success: true,
            
        });
    
    }  catch (err) {
         res.status(500).json({ error: err.message || 'Internal Server Error',success: false});
        // ✅ fixed typo here
        
    };
}
    
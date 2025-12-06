import * as userDao from "./dao.js";

export default function UserRoutes(app) {
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await userDao.findAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Get user by ID
  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await userDao.findUserById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Create user (admin)
  app.post("/api/users", async (req, res) => {
    try {
      const user = await userDao.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Update user
  app.put("/api/users/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      await userDao.updateUser(userId, req.body);
      const updatedUser = await userDao.findUserById(userId);

      // Update session if updating current user
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = updatedUser;
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Delete user
  app.delete("/api/users/:userId", async (req, res) => {
    try {
      const result = await userDao.deleteUser(req.params.userId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Search users by name
  app.get("/api/users/search/:name", async (req, res) => {
    try {
      const users = await userDao.findUsersByPartialName(req.params.name);
      res.json(users);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Failed to search users" });
    }
  });

  // Get users by role
  app.get("/api/users/role/:role", async (req, res) => {
    try {
      const users = await userDao.findUsersByRole(req.params.role);
      res.json(users);
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // ============ AUTH ROUTES ============

  // Sign up
  app.post("/api/users/signup", async (req, res) => {
    try {
      const existingUser = await userDao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }

      const newUser = await userDao.createUser(req.body);
      req.session["currentUser"] = newUser;
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Failed to sign up" });
    }
  });

  // Sign in
  app.post("/api/users/signin", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userDao.findUserByCredentials(username, password);

      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ error: "Failed to sign in" });
    }
  });

  // Sign out
  app.post("/api/users/signout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });

  // Get profile (current user)
  app.get("/api/users/profile", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json(currentUser);
  });
}
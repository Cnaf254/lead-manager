const Lead = require('../models/Lead');

// Add a new lead
exports.addLead = async (req, res) => {
  const { name, email, status } = req.body;

  try {
    // Check if email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists. Please use a unique email.' 
      });
    }

    // Create and save the new lead
    const lead = new Lead({ 
      name, 
      email, 
      status: status || "New", // Use provided status or default to "New"
      createdAt: new Date() // Automatically set the current timestamp
    });

    await lead.save();

    // Success response
    res.status(201).json({ 
      success: true, 
      message: 'Lead added successfully.', 
      data: lead 
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while adding the lead.', 
      error: err.message 
    });
  }
};

// Fetch all leads
exports.getLeads = async (req, res) => {
  try {
    // Fetch all leads sorted by createdAt in descending order
    const leads = await Lead.find().sort({ createdAt: -1 });

    // Success response
    res.status(200).json({ 
      success: true, 
      message: 'Leads fetched successfully.', 
      data: leads 
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching leads.', 
      error: err.message 
    });
  }
};
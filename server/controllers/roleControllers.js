const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRole = async (req, res) => {
    const { name, permissions } = req.body;

    const newRole = new Role({
        name,
        permissions,
    });

    try {
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { name, permissions },
            { new: true }
        );
        res.json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.json({ message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
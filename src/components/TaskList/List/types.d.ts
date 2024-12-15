/**
 * Copyright 2024 Son of Binary
 * The Fantasktick Project
 * This module contains type definitions for the List view
 */

interface Task {
  label: String;
  description: String;
  date: String;
  status: "pending" | "completed";
}

import 'package:shared_preferences/shared_preferences.dart';

import '../models/course.dart';

/// Persists the course list locally so it survives app restarts.
/// The list starts empty and is only ever populated through the hidden gesture.
class CourseStore {
  static const _key = 'courses_v1';

  Future<List<Course>> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_key);
    if (raw == null || raw.isEmpty) return <Course>[];
    try {
      return Course.decode(raw);
    } catch (_) {
      return <Course>[];
    }
  }

  Future<void> save(List<Course> courses) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, Course.encode(courses));
  }
}

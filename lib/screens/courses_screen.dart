import 'package:flutter/material.dart';

import '../models/course.dart';
import '../services/course_store.dart';
import '../theme.dart';
import '../widgets/add_course_dialog.dart';
import '../widgets/app_drawer.dart';
import '../widgets/grade_badge.dart';
import 'connection_failed_screen.dart';

class CoursesScreen extends StatefulWidget {
  const CoursesScreen({super.key});

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  final _store = CourseStore();
  List<Course> _courses = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final courses = await _store.load();
    if (!mounted) return;
    setState(() {
      _courses = courses;
      _loaded = true;
    });
  }

  Future<void> _persist() => _store.save(_courses);

  // ---- hidden gesture entry points -------------------------------------

  Future<void> _addCourse() async {
    final result = await showDialog<Course>(
      context: context,
      builder: (_) => const AddCourseDialog(),
    );
    if (result != null) {
      setState(() => _courses = [..._courses, result]);
      await _persist();
    }
  }

  Future<void> _editCourse(Course course) async {
    final action = await showModalBottomSheet<String>(
      context: context,
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.edit_outlined),
              title: const Text('Edit course'),
              onTap: () => Navigator.pop(context, 'edit'),
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline, color: Colors.red),
              title: const Text('Delete course',
                  style: TextStyle(color: Colors.red)),
              onTap: () => Navigator.pop(context, 'delete'),
            ),
          ],
        ),
      ),
    );
    if (action == 'delete') {
      setState(() => _courses.removeWhere((c) => c.id == course.id));
      await _persist();
    } else if (action == 'edit') {
      if (!mounted) return;
      final result = await showDialog<Course>(
        context: context,
        builder: (_) => AddCourseDialog(existing: course),
      );
      if (result != null) {
        setState(() {
          final i = _courses.indexWhere((c) => c.id == course.id);
          if (i != -1) _courses[i] = result;
        });
        await _persist();
      }
    }
  }

  // ----------------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.scaffold,
      drawer: const AppDrawer(),
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            _header(),
            Expanded(child: _body()),
          ],
        ),
      ),
    );
  }

  Widget _header() {
    return Container(
      color: AppColors.yellow,
      padding: const EdgeInsets.fromLTRB(8, 4, 16, 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Builder(
            builder: (ctx) => IconButton(
              icon: const Icon(Icons.menu, color: AppColors.dark, size: 30),
              onPressed: () => Scaffold.of(ctx).openDrawer(),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Hidden gesture: long-press the "Courses" title to add a course.
                Expanded(
                  child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onLongPress: _addCourse,
                    child: const Text(
                      'Courses',
                      style: TextStyle(
                        color: AppColors.dark,
                        fontSize: 38,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
                _filterButton(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _filterButton() {
    return Material(
      color: AppColors.dark,
      borderRadius: BorderRadius.circular(28),
      child: InkWell(
        borderRadius: BorderRadius.circular(28),
        onTap: () => openConnectionFailed(context, 'Filter'),
        child: const Padding(
          padding: EdgeInsets.symmetric(horizontal: 22, vertical: 14),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.tune, color: Colors.white, size: 22),
              SizedBox(width: 10),
              Text(
                'Filter',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _body() {
    if (!_loaded) {
      return const SizedBox.shrink();
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Hidden gesture (secondary): long-press the section bar to add a course.
        GestureDetector(
          behavior: HitTestBehavior.opaque,
          onLongPress: _addCourse,
          child: Container(
            color: AppColors.sectionBar,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
            child: const Text(
              'Current courses',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: Color(0xFF333333),
              ),
            ),
          ),
        ),
        Expanded(
          child: _courses.isEmpty
              ? const SizedBox.shrink()
              : ListView.separated(
                  padding: EdgeInsets.zero,
                  itemCount: _courses.length,
                  separatorBuilder: (_, __) =>
                      const Divider(height: 1, color: Color(0xFFE6E6E6)),
                  itemBuilder: (_, i) => _courseRow(_courses[i]),
                ),
        ),
      ],
    );
  }

  Widget _courseRow(Course course) {
    return Material(
      color: Colors.white,
      child: InkWell(
        onTap: () => openConnectionFailed(context, course.name),
        onLongPress: () => _editCourse(course),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Row(
            children: [
              CircleAvatar(
                radius: 28,
                backgroundColor: AppColors.avatarGold,
                child: Text(
                  course.abbreviation,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      course.name,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        color: AppColors.dark,
                      ),
                    ),
                    if (course.subtitle.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        course.subtitle,
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color(0xFF6B6B6B),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(width: 12),
              GradeBadge(grade: course.grade, status: course.status),
            ],
          ),
        ),
      ),
    );
  }
}

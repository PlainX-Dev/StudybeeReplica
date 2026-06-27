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
      body: Column(
        children: [
          _header(),
          Expanded(child: _body()),
        ],
      ),
    );
  }

  Widget _header() {
    final topInset = MediaQuery.of(context).padding.top;
    return Container(
      color: AppColors.yellow,
      padding: EdgeInsets.only(top: topInset),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(8, 6, 16, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Builder(
              builder: (ctx) => InkResponse(
                radius: 26,
                onTap: () => Scaffold.of(ctx).openDrawer(),
                child: const Padding(
                  padding: EdgeInsets.all(12),
                  child: Icon(Icons.menu, color: AppColors.dark, size: 28),
                ),
              ),
            ),
            const SizedBox(height: 14),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
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
                          fontSize: 40,
                          fontWeight: FontWeight.w800,
                          height: 1.0,
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
      ),
    );
  }

  Widget _filterButton() {
    return Material(
      color: AppColors.dark,
      borderRadius: BorderRadius.circular(30),
      child: InkWell(
        borderRadius: BorderRadius.circular(30),
        onTap: () => openConnectionFailed(context, 'Filter'),
        child: const Padding(
          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 15),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.filter_list, color: Colors.white, size: 24),
              SizedBox(width: 10),
              Text(
                'Filter',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 21,
                  fontWeight: FontWeight.w700,
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
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
            child: const Text(
              'Current courses',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: AppColors.sectionText,
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
                      const Divider(height: 1, thickness: 1, color: AppColors.divider),
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
          padding: const EdgeInsets.fromLTRB(20, 16, 16, 16),
          child: Row(
            children: [
              CircleAvatar(
                radius: 29,
                backgroundColor: AppColors.avatarGold,
                child: Text(
                  course.abbreviation,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 19,
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
                        height: 1.15,
                      ),
                    ),
                    if (course.subtitle.isNotEmpty) ...[
                      const SizedBox(height: 3),
                      Text(
                        course.subtitle,
                        style: const TextStyle(
                          fontSize: 15,
                          color: AppColors.subtitle,
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

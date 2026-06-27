import 'package:flutter/material.dart';

import '../models/course.dart';
import '../theme.dart';

/// Dialog reached through the hidden gesture for adding (or editing) a course
/// together with its grade and status colour.
class AddCourseDialog extends StatefulWidget {
  const AddCourseDialog({super.key, this.existing});

  /// When provided the dialog edits this course instead of creating one.
  final Course? existing;

  @override
  State<AddCourseDialog> createState() => _AddCourseDialogState();
}

class _AddCourseDialogState extends State<AddCourseDialog> {
  late final TextEditingController _name;
  late final TextEditingController _subtitle;
  late final TextEditingController _abbr;
  late String _grade;
  late String _status;

  static const _grades = ['A', 'B', 'C', 'D', 'E', 'F', '-'];
  static const _statuses = ['Green', 'Yellow', 'Red'];

  @override
  void initState() {
    super.initState();
    final e = widget.existing;
    _name = TextEditingController(text: e?.name ?? '');
    _subtitle = TextEditingController(text: e?.subtitle ?? '');
    _abbr = TextEditingController(text: e?.abbreviation ?? '');
    _grade = e?.grade ?? 'A';
    _status = e?.status ?? 'Green';
  }

  @override
  void dispose() {
    _name.dispose();
    _subtitle.dispose();
    _abbr.dispose();
    super.dispose();
  }

  String _autoAbbr(String name) {
    final cleaned = name.trim();
    if (cleaned.isEmpty) return '';
    if (cleaned.length == 1) return cleaned.toUpperCase();
    return cleaned.substring(0, 2);
  }

  void _submit() {
    final name = _name.text.trim();
    if (name.isEmpty) return;
    final abbr =
        _abbr.text.trim().isEmpty ? _autoAbbr(name) : _abbr.text.trim();
    final result = (widget.existing ??
            Course(
              id: DateTime.now().microsecondsSinceEpoch.toString(),
              name: '',
              subtitle: '',
              abbreviation: '',
              grade: '',
              status: '',
            ))
        .copyWith(
      name: name,
      subtitle: _subtitle.text.trim(),
      abbreviation: abbr,
      grade: _grade,
      status: _status,
    );
    Navigator.of(context).pop(result);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.existing == null ? 'Add course' : 'Edit course'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _name,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(
                labelText: 'Course name',
                hintText: 'e.g. Biologi 2',
              ),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _subtitle,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(
                labelText: 'Description',
                hintText: 'e.g. Biologi, nivå 2 - Na24',
              ),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _abbr,
              maxLength: 2,
              decoration: const InputDecoration(
                labelText: 'Initials (optional)',
                hintText: 'auto from name',
              ),
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _grade,
                    decoration: const InputDecoration(labelText: 'Grade'),
                    items: [
                      for (final g in _grades)
                        DropdownMenuItem(value: g, child: Text(g)),
                    ],
                    onChanged: (v) => setState(() => _grade = v ?? _grade),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _status,
                    decoration: const InputDecoration(labelText: 'Status'),
                    items: [
                      for (final s in _statuses)
                        DropdownMenuItem(
                          value: s,
                          child: Row(
                            children: [
                              Container(
                                width: 14,
                                height: 14,
                                decoration: BoxDecoration(
                                  color: AppColors.statusColor(s),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text(s),
                            ],
                          ),
                        ),
                    ],
                    onChanged: (v) => setState(() => _status = v ?? _status),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _submit,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.dark,
            foregroundColor: Colors.white,
          ),
          child: const Text('Save'),
        ),
      ],
    );
  }
}

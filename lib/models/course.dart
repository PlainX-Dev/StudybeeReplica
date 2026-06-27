import 'dart:convert';

/// A single course row as shown on the Courses screen.
class Course {
  Course({
    required this.id,
    required this.name,
    required this.subtitle,
    required this.abbreviation,
    required this.grade,
    required this.status,
  });

  final String id;
  final String name;
  final String subtitle;
  final String abbreviation;

  /// Letter grade shown in the coloured box (e.g. "A", "B", "-").
  final String grade;

  /// Traffic-light style status ("Green", "Yellow", "Red").
  final String status;

  Course copyWith({
    String? name,
    String? subtitle,
    String? abbreviation,
    String? grade,
    String? status,
  }) {
    return Course(
      id: id,
      name: name ?? this.name,
      subtitle: subtitle ?? this.subtitle,
      abbreviation: abbreviation ?? this.abbreviation,
      grade: grade ?? this.grade,
      status: status ?? this.status,
    );
  }

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'subtitle': subtitle,
        'abbreviation': abbreviation,
        'grade': grade,
        'status': status,
      };

  factory Course.fromMap(Map<String, dynamic> map) => Course(
        id: map['id'] as String,
        name: map['name'] as String? ?? '',
        subtitle: map['subtitle'] as String? ?? '',
        abbreviation: map['abbreviation'] as String? ?? '',
        grade: map['grade'] as String? ?? '-',
        status: map['status'] as String? ?? 'Green',
      );

  static String encode(List<Course> courses) =>
      jsonEncode(courses.map((c) => c.toMap()).toList());

  static List<Course> decode(String source) =>
      (jsonDecode(source) as List<dynamic>)
          .map((e) => Course.fromMap(e as Map<String, dynamic>))
          .toList();
}

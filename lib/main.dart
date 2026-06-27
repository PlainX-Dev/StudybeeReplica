import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'screens/splash_screen.dart';
import 'theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const StudyBeeApp());
}

class StudyBeeApp extends StatelessWidget {
  const StudyBeeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Study Bee',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(),
      home: const SplashScreen(),
    );
  }
}

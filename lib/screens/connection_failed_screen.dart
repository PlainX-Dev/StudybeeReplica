import 'dart:async';

import 'package:flutter/material.dart';

import '../theme.dart';

/// Shown whenever the user taps anything that would normally hit the server
/// (Calendar, Communication, Bulletin Board, Filter, Log out, a course, ...).
/// It pretends to load for a moment and then reports a connection failure,
/// because this replica is fully offline.
class ConnectionFailedScreen extends StatefulWidget {
  const ConnectionFailedScreen({super.key, required this.title});

  final String title;

  @override
  State<ConnectionFailedScreen> createState() => _ConnectionFailedScreenState();
}

class _ConnectionFailedScreenState extends State<ConnectionFailedScreen> {
  bool _loading = true;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startLoading();
  }

  void _startLoading() {
    setState(() => _loading = true);
    _timer?.cancel();
    _timer = Timer(const Duration(milliseconds: 1900), () {
      if (mounted) setState(() => _loading = false);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.scaffold,
      appBar: AppBar(
        backgroundColor: AppColors.yellow,
        elevation: 0,
        foregroundColor: AppColors.dark,
        title: Text(
          widget.title,
          style: const TextStyle(
            color: AppColors.dark,
            fontWeight: FontWeight.w800,
          ),
        ),
      ),
      body: Center(
        child: _loading ? _buildLoading() : _buildError(),
      ),
    );
  }

  Widget _buildLoading() {
    return const Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 46,
          height: 46,
          child: CircularProgressIndicator(
            strokeWidth: 4,
            valueColor: AlwaysStoppedAnimation(AppColors.yellowDark),
          ),
        ),
        SizedBox(height: 18),
        Text(
          'Loading…',
          style: TextStyle(color: Color(0xFF777777), fontSize: 15),
        ),
      ],
    );
  }

  Widget _buildError() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.cloud_off_rounded,
              size: 72, color: Color(0xFFBDBDBD)),
          const SizedBox(height: 18),
          const Text(
            'Connection to server failed at the time.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w600,
              color: Color(0xFF444444),
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: _startLoading,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.dark,
              foregroundColor: Colors.white,
              padding:
                  const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
            ),
            child: const Text('Try again'),
          ),
        ],
      ),
    );
  }
}

/// Helper that pushes the connection-failed flow from anywhere.
void openConnectionFailed(BuildContext context, String title) {
  Navigator.of(context).push(
    MaterialPageRoute(
      builder: (_) => ConnectionFailedScreen(title: title),
    ),
  );
}

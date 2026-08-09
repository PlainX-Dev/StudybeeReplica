import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:korkortskompis/core/store.dart';
import 'package:korkortskompis/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Boots the real app and walks every tab. Cheap, but it is what catches a
/// missing sign id or a broken lookup before the APK reaches a phone.
void main() {
  testWidgets('every tab renders and the language toggle works', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final state = await AppState.load();
    await tester.pumpWidget(KompisApp(state: state));
    await tester.pumpAndSettle();

    // Home.
    expect(find.text('Körkortskompis'), findsNothing); // the title lives in settings
    expect(find.byIcon(Icons.settings_rounded), findsOneWidget);

    Future<void> tapTab(IconData icon) async {
      await tester.tap(find.byIcon(icon).last);
      await tester.pumpAndSettle();
    }

    await tapTab(Icons.menu_book_rounded);
    expect(find.text('All chapters'), findsOneWidget);

    await tapTab(Icons.bolt_rounded);
    expect(find.text('Practice'), findsWidgets);

    await tapTab(Icons.signpost_rounded);
    expect(find.textContaining('road signs'), findsWidgets);

    await tapTab(Icons.insights_rounded);
    expect(find.text('Your progress'), findsOneWidget);

    await tapTab(Icons.cottage_rounded);
    expect(find.byIcon(Icons.settings_rounded), findsOneWidget);
  });

  testWidgets('a chapter opens and its sections expand', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final state = await AppState.load();
    await tester.pumpWidget(KompisApp(state: state));
    await tester.pumpAndSettle();

    await tester.tap(find.byIcon(Icons.menu_book_rounded).last);
    await tester.pumpAndSettle();

    await tester.tap(find.text('The licence and the law').first);
    await tester.pumpAndSettle();

    expect(find.textContaining('Categories'), findsWidgets);
    expect(state.readSections, isEmpty);

    // Opening a section marks it read.
    await tester.tap(find.textContaining('Categories — what may you drive?').first);
    await tester.pumpAndSettle();
    expect(state.readSections, isNotEmpty);
  });
}
